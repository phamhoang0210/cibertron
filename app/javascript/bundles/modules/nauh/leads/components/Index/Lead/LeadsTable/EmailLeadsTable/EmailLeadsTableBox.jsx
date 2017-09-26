import React from 'react'
import _ from 'lodash'
import { List } from 'immutable'
import { Table, Badge } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/config'

class EmailLeadsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange'
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: 'Campaign name',
      dataIndex: 'campaign_name',
      key: 'campaign_name',
    }, {
      title: 'Read at',
      dataIndex: 'read_at',
      key: 'read_at',
      render: value => {
        const readAt = moment(value).format(LONG_DATETIME_FORMAT)
        if(value) {
          return (<Badge status="success" text={readAt} />)
        } else {
          return (<Badge status="warning" text="Pending" />)
        }
      }
    }]
  }

  componentDidMount() {
    const {lead, actions} = this.props
    const emailLeads = lead.get('emailLeads')
    if(!emailLeads) {
      actions.fetchEmailLeads(lead, { lead_id: lead.get('id') })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, lead} = this.props
    let emailLeadParams = getFilterParams(lead.get('emailLeadFilters'))
    const {current, pageSize, total} = pagination

    if(current != emailLeadParams.page) {
      emailLeadParams.page = current
    }

    actions.fetchEmailLeads(lead, emailLeadParams)
  }

  render() {
    const {lead, actions} = this.props
    const emailLeads = lead.get('emailLeads') || List([])
    const paging = lead.getIn(['emailLeadFilters', 'paging'])
    const isFetchingEmailLeads = lead.get('isFetchingEmailLeads')
    return (
      <Table
        size="middle"
        columns={this.columns}
        dataSource={emailLeads.toJS()}
        rowKey="id"
        onChange={this.handleTableChange}
        loading={isFetchingEmailLeads}
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default EmailLeadsTableBox