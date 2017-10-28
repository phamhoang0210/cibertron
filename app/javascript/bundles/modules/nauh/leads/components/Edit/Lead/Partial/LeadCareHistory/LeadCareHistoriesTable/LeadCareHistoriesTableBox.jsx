import React from 'react'
import _ from 'lodash'
import { Row, Col, Table } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'

import 'styles/modules/nauh/leads'

class LeadCareHistoriesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])

    const {intl} = this.props

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.id.label'}),
        dataIndex: 'id',
        key: 'id',
        width: 50,
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.created_at.label'}),
        dataIndex: 'created_at',
        key: 'created_at',
        width: '10%',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.lead_care_status_name.label'}),
        dataIndex: 'lead_care_status.name',
        key: 'lead_care_status_name',
        width: '30%',
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.label'}),
        dataIndex: 'result_note',
        key: 'result_note',
        width: '40%',
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.user_id.label'}),
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
    let leadCareHistoriesParams = getFilterParams(editState.get('leadCareHistoryFilters'))
    if(current != leadCareHistoriesParams.page) {
      leadCareHistoriesParams.page = current
    }

    actions.fetchLeadCareHistories({...leadCareHistoriesParams, lead_id: lead.get('id')})
  }


  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const leadCareHistoriesParams = getFilterParams(editState.get('leadCareHistoryFilters'))
    actions.fetchLeadCareHistories({...leadCareHistoriesParams, lead_id: lead.get('id')})
  }

  render() {
    const {editState, intl} = this.props
    const leadCareHistories = editState.get('leadCareHistories')
    const paging = editState.getIn(['leadCareHistoryFilters', 'paging'])
    const isFetchingLeadCareHistories = editState.get('isFetchingLeadCareHistories')
    
    return (
      <div className="box box-with-border box-with-shadow">
        <div className="box-header">
          <h3 className="box-title">
            {intl.formatMessage({id: 'edit.lead.partial.lead_care_histories_table.title'})}
          </h3>
        </div>
        <div className="box-body">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={leadCareHistories.toJS()}
            pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
            rowKey="id"
            onChange={this.handleTableChange}
            loading={isFetchingLeadCareHistories}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(LeadCareHistoriesTableBox)