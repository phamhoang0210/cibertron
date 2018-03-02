import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal, Popover, Icon
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
const { TabPane } = Tabs

class UnsubscribesTableBox extends React.Component {
  constructor(props) {
    super(props)
    const {intl} = this.props

    this.state = {
      showImportUnsubscribeModal: false
    }

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableUnsubscribesChange',
      'handleSearch',
      'handleImportUnsubscribe',
      'handleCancel',
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '15%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },{
        title: intl.formatMessage({id: 'attrs.email.label'}),
        width: '45%',
        dataIndex: 'email',
        key: 'email'
      },{
        title: intl.formatMessage({id: 'attrs.campaign.label'}),
        width: '40%',
        key: 'campaign'
      },
      {
        title: '',
        dataIndex: 'action',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
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
                  size="small"
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

  handleTableUnsubscribesChange(pagination, filters, sorter) {
    const {actions, sharedState} = this.props
    const {current, pageSize, total} = pagination

    let unsubscribeParams = {}
    if(current != unsubscribeParams.page) {
      unsubscribeParams.page = current
    }

    if(sorter.field) {
      unsubscribeParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }

    unsubscribeParams = getFilterParams(sharedState.get('unsubscribesFilters'), unsubscribeParams)
    unsubscribeParams.page = current
    actions.fetchUnsubscribes(unsubscribeParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, {full_search: keyword})
    actions.fetchLists(listParams)
  }

  handleImportUnsubscribe() {
    const {actions} = this.props
    const file = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', file)
    actions.importUnsubscribes(data)
    this.setState({showImportUnsubscribeModal: false})
  }

  handleCancel() {
    this.setState({showImportUnsubscribeModal: false})
  }

  render() {
    const {indexState, sharedState, intl} = this.props
    const paging = sharedState.getIn(['unsubscribesFilters', 'paging'])
    const unsubscribes = sharedState.get('unsubscribes')
    const isFetchingUnsubscribes = indexState.get('isFetchingUnsubscribes')

    return (
      <div>
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={(e) => this.setState({showImportUnsubscribeModal: true})}
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
          dataSource={unsubscribes.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="id"
          onChange={this.handleTableUnsubscribesChange}
          loading={isFetchingUnsubscribes}
        />
        <Modal
          title="Import Unsubscribes"
          visible={this.state.showImportUnsubscribeModal}
          onOk={this.handleImportUnsubscribe}
          onCancel={this.handleCancel}
          okText="Import"
          cancelText="Close"
        >
          <input
            ref={ref => this.inputFile = ref}
            type="file"
            name="file"
            placeholder=""
            accept=".csv"
            required
          />
          <p className="help-block">
            Please upload format correct file (.csv, .xlsx). <a href="#">Sample file</a>
          </p>
        </Modal>
      </div>)
  }
}
export default injectIntl(UnsubscribesTableBox)