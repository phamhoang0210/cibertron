import React from 'react'
import _ from 'lodash'
import { List } from 'immutable'
import { Table } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { EROS_BASE_URL } from 'app/constants/paths'

class OrdersTableBox extends React.Component {
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
      title: 'Actions',
      dataIndex: 'source_id',
      key: 'source_id',
      render: (value, record) => (
        <span>
          <a href={`${EROS_BASE_URL}/order/${record.source_id}/misa`} target="_blank">View on Eros</a>
        </span>
      )
    }]
  }

  componentDidMount() {
    const {lead, actions} = this.props
    const orders = lead.get('orders')
    if(!orders) {
      actions.fetchLeadOrders(lead, { lead_id: lead.get('id') })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, lead, location} = this.props
    let leadOrderParams = getFilterParams(lead.get('orderFilters'))
    const {current, pageSize, total} = pagination

    if(current != leadOrderParams.page) {
      leadOrderParams.page = current
    }

    actions.fetchLeadOrders(lead, leadOrderParams)
  }

  render() {
    const {lead, actions} = this.props
    const leadOrders = lead.get('orders') || List([])
    const paging = lead.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = lead.get('isFetchingOrders')
    return (
      <Table
        size="middle"
        columns={this.columns}
        dataSource={leadOrders.toJS()}
        rowKey="id"
        onChange={this.handleTableChange}
        loading={isFetchingOrders}
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default OrdersTableBox