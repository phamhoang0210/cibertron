import React from 'react'
import _ from 'lodash'
import { List } from 'immutable'
import { Table, Tag } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { EROS_BASE_URL } from 'app/constants/paths'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../../constants/constants'
import { injectIntl } from 'react-intl'

class CallLogsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange'
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.call_log.attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.call_log.attrs.result_note.label'}),
      dataIndex: 'result_note',
      key: 'result_note',
      width: '40%',
    }, {
      title: intl.formatMessage({id: 'attrs.call_log.attrs.call_status_id.label'}),
      dataIndex: 'call_status.name',
      key: 'call_status_name',
      width: '20%',
    }]
  }

  componentDidMount() {
    const {lead, actions} = this.props
    const callLogs = lead.get('callLogs')
    if(!callLogs) {
      actions.fetchLeadCallLogs(lead, { lead_id: lead.get('id'), fields: 'call_status{care_status{}}' })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, lead, location} = this.props
    let leadCallLogParams = getFilterParams(lead.get('callLogFilters'))
    const {current, pageSize, total} = pagination

    if(current != leadCallLogParams.page) {
      leadCallLogParams.page = current
    }

    actions.fetchLeadCallLogs(lead, leadCallLogParams)
  }

  render() {
    const {lead, actions} = this.props
    const leadCallLogs = lead.get('callLogs') || List([])
    const paging = lead.getIn(['callLogFilters', 'paging'])
    const isFetchingCallLogs = lead.get('isFetchingCallLogs')
    return (
      <Table
        size="middle"
        columns={this.columns}
        dataSource={leadCallLogs.toJS()}
        rowKey="id"
        onChange={this.handleTableChange}
        loading={isFetchingCallLogs}
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default injectIntl(CallLogsTableBox)