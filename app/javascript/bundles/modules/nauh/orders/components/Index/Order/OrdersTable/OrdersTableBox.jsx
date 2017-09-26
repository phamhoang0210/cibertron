import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ORDERS_URL } from '../../../../constants/paths'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/config'
import { EROS_BASE_URL } from 'app/constants/paths'

const { Search } = Input

class OrdersTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Lead',
      dataIndex: 'lead',
      key: 'lead',
      render: value => {
        if(value) {
          return (
            <div>
              <b>{value.name}</b><br/>
              <span>{`• ${value.email}`}</span><br/>
              <span>{`• ${value.mobile}`}</span><br/>
            </div>
          )
        }
      }
    },{
      title: 'Campaign code',
      dataIndex: 'campaign_id',
      key: 'campaign_id',
      render: value => {
        const {sharedState} = this.props
        const campaigns = sharedState.get('campaigns')
        const campaign = campaigns.find(c => c.get('id') == value)
        return campaign ? campaign.get('code') : ''
      }
    }, {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (value, record) => (
        <span>
          <a href={`${EROS_BASE_URL}/order/${record.source_id}/misa`} target="_blank">View on Eros</a>
        </span>
      )
    }];
  }

  handleDelete(orderId) {
    const {actions, indexState} = this.props
    actions.deleteOrder(orderId)
  }

  handleEdit(orderId) {
    browserHistory.push(`${ORDERS_URL}/${orderId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${ORDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let orderParams = getFilterParams(indexState.get('orderFilters'))
    const {current, pageSize, total} = pagination

    if(current != orderParams.page) {
      orderParams.page = current
    }

    actions.fetchOrders(orderParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let orderParams = getFilterParams(indexState.get('orderFilters'))
    actions.fetchOrders(mergeDeep([orderParams, {compconds: {lead: {'email.like': `%${keyword}%`}}}]))
  }

  render() {
    const {indexState} = this.props
    const orders = indexState.get('orders')
    const paging = indexState.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = indexState.get('isFetchingOrders')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
            {/*<Button
              style={{marginBottom: '8px'}}
              onClick={this.handleAdd}
            >
              Add
            </Button>*/}
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              placeholder="Search by lead email.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={orders.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingOrders}
        />
      </div>
    )
  }
}

export default OrdersTableBox