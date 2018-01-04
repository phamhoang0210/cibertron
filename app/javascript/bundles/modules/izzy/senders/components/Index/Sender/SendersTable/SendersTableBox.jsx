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
import { SENDERS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class SendersTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch'
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
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        key: 'email'},
      {
        title: intl.formatMessage({id: 'attrs.creator.label'}),
        width: '10%',
        dataIndex: 'username', 
        key: 'user'},
      {
        title: '',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                shape="circle"
                size="large"
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
                  shape="circle"
                  size="large"
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
    const currentSenderFilters = Immutable.fromJS(getFilterParams(indexState.get('senderFilters'), location))
    return {
      search: currentSenderFilters.get('full_search'),
    }
  }

  handleDelete(senderId) {
    const {actions, indexState} = this.props
    actions.deleteSender(senderId)
  }

  handleEdit(senderId) {
    browserHistory.push(`${SENDERS_URL}/${senderId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${SENDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let senderParams = {}
    if(current != senderParams.page) {
      senderParams.page = current
    }

    if(sorter.field) {
      senderParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    senderParams = getFilterParamsAndSyncUrl(indexState.get('senderFilters'), location, senderParams)

    actions.fetchSenders(senderParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let senderParams = getFilterParamsAndSyncUrl(indexState.get('senderFilters'), location, {full_search: keyword})
    actions.fetchSenders(senderParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedSenderKeys = indexState.get('selectedSenderKeys')
    const senders = indexState.get('senders')
    const paging = indexState.getIn(['senderFilters', 'paging'])
    const isFetchingSenders = indexState.get('isFetchingSenders')

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
          dataSource={senders.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingSenders}
        />
      </div>
    )
  }
}

export default injectIntl(SendersTableBox)