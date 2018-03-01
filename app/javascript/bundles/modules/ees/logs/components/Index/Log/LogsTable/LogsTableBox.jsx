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
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class LogsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch'
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_at.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        width: '15%',
        key: 'email'
      },{
        title: intl.formatMessage({id: 'attrs.status.label'}),
        dataIndex: 'status',
        width: '10%',
        key: 'status'
      },{
        title: intl.formatMessage({id: 'attrs.opened_at.label'}),
        dataIndex: 'email_open_at',
        key: 'email_open_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },{
        title: intl.formatMessage({id: 'attrs.sender.label'}),
        width: '15%',
        dataIndex: 'sender', 
        key: 'sender'
      },{
        title: intl.formatMessage({id: 'attrs.sender.label'}),
        width: '10%',
        dataIndex: 'group_name', 
        key: 'group_name'
      },{
        title: intl.formatMessage({id: 'attrs.error.label'}),
        width: '10%',
        dataIndex: 'error', 
        key: 'error'
      },{
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                ghost
                icon="eye"
                className="button-margin--left--default"
                onClick={(e) => this.handleShowTemplateModal(row.content)}
              >
              </Button>
            </div>
          )
        },
      },
    ]
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentLogFilters = Immutable.fromJS(getFilterParams(indexState.get('logFilters'), location))
    return {
      search: currentLogFilters.get('full_search'),
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let logParams = {}
    if(current != logParams.page) {
      logParams.page = current
    }

    if(sorter.field) {
      logParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    logParams = getFilterParamsAndSyncUrl(indexState.get('logFilters'), location, logParams)

    actions.fetchLogs(logParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let logParams = getFilterParamsAndSyncUrl(indexState.get('logFilters'), location, {full_search: keyword})
    actions.fetchLogs(logParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedLogKeys = indexState.get('selectedLogKeys')
    const logs = indexState.get('logs')
    const paging = indexState.getIn(['logFilters', 'paging'])
    const isFetchingLogs = indexState.get('isFetchingLogs')

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
          dataSource={logs.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingLogs}
        />
      </div>
    )
  }
}

export default injectIntl(LogsTableBox)