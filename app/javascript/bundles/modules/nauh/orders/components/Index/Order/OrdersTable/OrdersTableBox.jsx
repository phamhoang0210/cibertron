import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Row, Col, Input } from 'antd'
import {
  getFilterParamsAndSyncUrl, getFilterParams, mergeDeep, getDefaultTablePagination,
  getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ORDERS_URL } from '../../../../constants/paths'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { EROS_BASE_URL } from 'app/constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class OrdersTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.initialValues = this.getInitialValues()

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.lead.label'}),
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
      title: intl.formatMessage({id: 'attrs.campaign.label'}),
      dataIndex: 'campaign_id',
      key: 'campaign_id',
      render: value => {
        const {sharedState} = this.props
        const campaigns = sharedState.get('campaigns')
        const campaign = campaigns.find(c => c.get('id') == value)
        return campaign ? campaign.get('code') : ''
      }
    }, {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      dataIndex: 'actions',
      key: 'actions',
      render: (value, record) => (
        <span>
          <a href={`${EROS_BASE_URL}/order/${record.source_id}/misa`} target="_blank">
            {intl.formatMessage({id: 'index.orders_table.actions.button.view_on_eros'})}
          </a>
        </span>
      )
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentOrderParams = Immutable.fromJS(getFilterParams(indexState.get('orderFilters'), location))

    return {
      search: getInitialValueForSearch({}, currentOrderParams, ['lead', 'email.like']),
    }
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
    const {actions, indexState, location} = this.props
    let orderParams = {}
    const {current, pageSize, total} = pagination

    if(current != orderParams.page) {
      orderParams.page = current
    }

    orderParams = getFilterParamsAndSyncUrl(indexState.get('orderFilters'), location, orderParams)

    actions.fetchOrders(orderParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let orderParams = getFilterParamsAndSyncUrl(
      indexState.get('orderFilters'),
      location,
      {compconds: {lead: {'email.like': `%${keyword}%`}}}
    )
    actions.fetchOrders(orderParams)
  }

  render() {
    const {indexState, intl} = this.props
    const orders = indexState.get('orders')
    const paging = indexState.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = indexState.get('isFetchingOrders')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              defaultValue={this.initialValues.search.initialValue}
              placeholder={intl.formatMessage({id: 'index.orders_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={orders.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingOrders}
        />
      </div>
    )
  }
}

export default injectIntl(OrdersTableBox)