import React from 'react'
import _ from 'lodash'
import { List } from 'immutable'
import { Table, Tag, Button } from 'antd'
import { getFilterParams, generateErosOrderLink } from 'helpers/applicationHelper'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { EROS_BASE_URL } from 'app/constants/paths'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../../constants/constants'
import { injectIntl } from 'react-intl'
import { browserHistory } from 'react-router'
import { ORDERS_URL } from '../../../../../constants/paths'

class OrdersTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleEdit',
      'handleOpenOnEros'
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.order.attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
      width: 50,
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.user_id.label'}),
      dataIndex: 'user_id',
      key: 'user_id',
      render: value => {
        const {sharedState} = this.props
        return sharedState.getIn(['userIdMappings', `${value}`, 'username'])
      },
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.product.label'}),
      dataIndex: 'product_id',
      key: 'product_id',
      width: '35%',
      render: (value, record) => {
        const {sharedState} = this.props
        let product = null

        if(record.product_type == 'course') {
          product = sharedState.getIn(['courseSourceIdMappings', `${value}`])
        } else if (record.product_type == 'combo') {
          product = sharedState.getIn(['comboSourceIdMappings', `${value}`])
        }

        if(product) {
          return (
            <div>
              <b>{product.get('code')}</b><br/>
              <i>{product.get('name')}</i>
            </div>
          )
        }
      }
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.payment_method.label'}),
      dataIndex: 'payment.payment_method.name',
      key: 'payment_method_name',
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.order_level_code.label'}),
      dataIndex: 'order_level.code',
      key: 'order_level_code',
      width: '25%',
      render: (value, record) => (
        <div>
          <Tag color={LEVEL_COLOR_MAPPINGS[value]}>{value}</Tag>
          <br/>
          <p style={{padding: "4px 0px"}}>
            <i>{record.payment && record.payment.status}</i>
          </p>
        </div>
      )
    }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.actions.label'}),
      key: 'actions',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="edit"
              type="primary"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Button
              icon="export"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleOpenOnEros(row.source_id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.eros.text'})}
            </Button>
          </div>
        )
      },
    }]
  }

  handleEdit(orderId) {
    window.open(`${ORDERS_URL}/${orderId}/edit`,'_blank')
  }

  handleOpenOnEros(sourceId) {
    window.open(generateErosOrderLink(sourceId),'_blank')
  }

  componentDidMount() {
    const {lead, actions} = this.props
    const orders = lead.get('orders')
    if(!orders) {
      actions.fetchLeadOrders(lead, { lead_id: lead.get('id'), fields: 'payment{payment_method{},payment_detail{}},order_level{}' })
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

export default injectIntl(OrdersTableBox)