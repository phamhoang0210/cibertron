import React from 'react'
import _ from 'lodash'
import { Row, Col, Table } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'

import 'styles/modules/nauh/leads'

class CallLogsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])

    const {intl} = this.props

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.id.label'}),
        dataIndex: 'id',
        key: 'id',
        width: 50,
      }, {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.created_at.label'}),
        dataIndex: 'created_at',
        key: 'created_at',
        width: '10%',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
      }, {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.call_status_care_status_name.label'}),
        dataIndex: 'call_status.care_status.name',
        key: 'call_status_care_status_name',
        width: '20%',
      }, {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.call_status_name.label'}),
        dataIndex: 'call_status.name',
        key: 'call_status_name',
        width: '20%',
      }, {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.result_note.label'}),
        dataIndex: 'result_note',
        key: 'result_note',
        width: '30%',
      }, {
        title: intl.formatMessage({id: 'attrs.call_log.attrs.user_id.label'}),
        dataIndex: 'user_id',
        key: 'user_id',
        render: value => {
          const {sharedState} = this.props
          return sharedState.getIn(['userIdMappings', `${value}`, 'username'])
        },
      }
    ]
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, editState, location} = this.props
    const {current, pageSize, total} = pagination

    const lead = editState.get('lead')
    let callLogsParams = getFilterParams(editState.get('callLogFilters'))
    if(current != callLogsParams.page) {
      callLogsParams.page = current
    }

    actions.fetchCallLogs({...callLogsParams, lead_id: lead.get('id')})
  }


  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const callLogsParams = getFilterParams(editState.get('callLogFilters'))
    actions.fetchCallLogs({...callLogsParams, lead_id: lead.get('id')})
  }

  render() {
    const {editState, intl} = this.props
    const callLogs = editState.get('callLogs')
    const paging = editState.getIn(['callLogFilters', 'paging'])
    const isFetchingCallLogs = editState.get('isFetchingCallLogs')
    
    return (
      <div>
        <Table
          bcallLoged
          size="middle"
          columns={this.columns}
          dataSource={callLogs.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingCallLogs}
        />
      </div>
    );
  }
}

export default injectIntl(CallLogsTableBox)