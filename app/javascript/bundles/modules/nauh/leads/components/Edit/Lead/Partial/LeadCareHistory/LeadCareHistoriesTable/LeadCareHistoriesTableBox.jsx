import React from 'react'
import _ from 'lodash'
import { Row, Col, Table, Button } from 'antd'
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
      'handleGetCallLogAudioLink',
    ])

    const {intl} = this.props

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.id.label'}),
        dataIndex: 'id',
        key: 'id',
        width: '5%',
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
        width: '20%',
      },
      {
        title: 'Level',
        dataIndex: 'lead_care_status.lead_sub_status_id',
        key: 'lead_sub_status_id',
        width: '5%',
      },{
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.lead_care_status_name_2.label'}),
        dataIndex: 'lead_care_status.lead_status.name',
        key: 'lead_status_care_name_2',
        width: '10%',
      },{
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.schedule_at.label'}),
        dataIndex: 'schedule_at',
        key: 'schedule_at',
        width: '10%',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
      },{
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.label'}),
        dataIndex: 'result_note',
        key: 'result_note',
        width: '10%',
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.user_id.label'}),
        dataIndex: 'user_id',
        key: 'user_id',
        width: '10%',
        render: value => {
          const {sharedState} = this.props
          return sharedState.getIn(['userIdMappings', `${value}`, 'username'])
        },
      }, {
        title: intl.formatMessage({id: 'attrs.lead_care_history.attrs.call_log_audio.label'}),
        dataIndex: 'call_log',
        key: 'call_log',
        width: '10%',
        render: (value, record) => {
          if(value) {
            if(value.audio_link) {
              return (
                <audio controls>
                  <source src={value.audio_link} type="audio/wav"/>
                  {intl.formatMessage({id: 'attrs.lead_care_history.attrs.call_log_audio.browser_not_support'})}
                </audio>
              )
            } else {
              return (
                <Button
                  onClick={e => this.handleGetCallLogAudioLink(record.id)}
                  size="small"
                  loading={!!record.isFetchingCallLogAudioLink}
                >
                  {intl.formatMessage({id: 'attrs.lead_care_history.attrs.call_log_audio.get_audio_link'})}
                </Button>
              )
            }
          } else {
            return intl.formatMessage({id: 'attrs.lead_care_history.attrs.call_log_audio.not_found_call_log'})
          }
        }
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

  handleGetCallLogAudioLink(leadCareHistoryId){
    const {actions} = this.props
    actions.fetchCallLogAudioLink(leadCareHistoryId)
  }


  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const leadCareHistoriesParams = getFilterParams(editState.get('leadCareHistoryFilters'))
    actions.fetchLeadCareHistories({fields: leadCareHistoriesParams.fields, lead_id: lead.get('id')})
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
