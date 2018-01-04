import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LISTS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class ListsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.name.label'}),
        dataIndex: 'name',
        key: 'name'},
      {
        title: intl.formatMessage({id: 'attrs.count.label'}),
        width: '10%',
        dataIndex: 'contact_count', 
        key: 'count'},
      {
        title: intl.formatMessage({id: 'attrs.creator.label'}),
        width: '10%',
        dataIndex: 'username', 
        key: 'user'},
      {
        title: intl.formatMessage({id: 'attrs.last_update.label'}),
        width: '10%',
        dataIndex: 'updated_at', 
        key: 'last_update',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'form.form_item.button.add.text'}),
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                icon="edit"
                className="button-margin--left--default"
                onClick={(e) => this.handleEdit(row.id)}
              >
              </Button>
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
                onConfirm={() => this.handleDelete(row.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  icon="delete" 
                  type="danger" 
                  loading={row.isDeleting}
                  className="button-margin--left--default">
                </Button>
              </Popconfirm>
            </div>
          )
        },
      },
    ]
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentListFilters = Immutable.fromJS(getFilterParams(indexState.get('listFilters'), location))
    return {
      search: currentListFilters.get('full_search'),
    }
  }

  handleDelete(listId) {
    const {actions, indexState} = this.props
    actions.deleteList(listId)
  }

  handleEdit(listId) {
    browserHistory.push(`${LISTS_URL}/${listId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${LISTS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let listParams = {}
    if(current != listParams.page) {
      listParams.page = current
    }

    if(sorter.field) {
      listParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, listParams)

    actions.fetchLists(listParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, {full_search: keyword})
    actions.fetchLists(listParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedListKeys = indexState.get('selectedListKeys')
    const lists = indexState.get('lists')
    const paging = indexState.getIn(['listFilters', 'paging'])
    const isFetchingLists = indexState.get('isFetchingLists')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
          </Col>
        </Row>
        
        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={lists.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingLists}
        />
      </div>
    )
  }
}

export default injectIntl(ListsTableBox)