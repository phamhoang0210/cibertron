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

class EmailsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props


    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_at.label'}), 
        width: '12%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        width: '20%',
        key: 'email'
      },{
        title: intl.formatMessage({id: 'attrs.status.label'}),
        dataIndex: 'status',
        width: '15%',
        key: 'status'
      },{
        title: intl.formatMessage({id: 'attrs.opened_at.label'}),
        dataIndex: 'open_at',
        width: '18%',
        key: 'open_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },{
        title: intl.formatMessage({id: 'attrs.error.label'}),
        
        dataIndex: 'error', 
        key: 'error'
      },{
        title: '',
        dataIndex: 'action',
        width: '5%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                ghost
                icon="eye"
                className="button-margin--left--default"
              >
              </Button>
            </div>
          )
        },
      },
    ]
  }
  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let emailParams = {}
    if(current != emailParams.page) {
      emailParams.page = current
    }

    if(sorter.field) {
      emailParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    emailParams = getFilterParamsAndSyncUrl(indexState.get('emailFilters'), location, emailParams)

    actions.fetchEmails(emailParams)
  }

  handleSearch(keyword) {

  }

  render(){
    const {indexState, sharedState, actions, intl} = this.props
    const emailLogs = indexState.get('emails')
    const paging = indexState.getIn(['emailFilters', 'paging'])
    const isFetchingEmailLogs = indexState.get('isFetchingEmailLogs')
    return(
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder= {intl.formatMessage({id: 'placeholder.title'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
         <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={emailLogs.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingEmailLogs}
        />
      </div>
    )
  }
}

export default injectIntl(EmailsTableBox)