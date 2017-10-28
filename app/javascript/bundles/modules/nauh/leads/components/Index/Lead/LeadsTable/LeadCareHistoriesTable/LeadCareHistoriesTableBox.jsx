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

class LeadCareHistoriesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange'
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.label'}),
      dataIndex: 'result_note',
      key: 'result_note',
      width: '40%',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.lead_care_status_id.label'}),
      dataIndex: 'lead_care_status.name',
      key: 'lead_care_status_name',
      width: '20%',
    }]
  }

  componentDidMount() {
    const {lead, actions} = this.props
    const leadCareHistories = lead.get('leadCareHistories')
    if(!leadCareHistories) {
      actions.fetchLeadLeadCareHistories(lead, { lead_id: lead.get('id'), fields: 'lead_care_status{lead_status{}}' })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, lead, location} = this.props
    let leadLeadCareHistoryParams = getFilterParams(lead.get('leadCareHistoryFilters'))
    const {current, pageSize, total} = pagination

    if(current != leadLeadCareHistoryParams.page) {
      leadLeadCareHistoryParams.page = current
    }

    actions.fetchLeadLeadCareHistories(lead, leadLeadCareHistoryParams)
  }

  render() {
    const {lead, actions} = this.props
    const leadLeadCareHistories = lead.get('leadCareHistories') || List([])
    const paging = lead.getIn(['leadCareHistoryFilters', 'paging'])
    const isFetchingLeadCareHistories = lead.get('isFetchingLeadCareHistories')
    return (
      <Table
        size="middle"
        columns={this.columns}
        dataSource={leadLeadCareHistories.toJS()}
        rowKey="id"
        onChange={this.handleTableChange}
        loading={isFetchingLeadCareHistories}
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default injectIntl(LeadCareHistoriesTableBox)