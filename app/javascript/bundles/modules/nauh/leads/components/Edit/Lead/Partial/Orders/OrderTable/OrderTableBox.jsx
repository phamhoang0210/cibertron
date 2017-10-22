import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Row, Col, Table, Tag } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../../../constants/constants'
import OrderDetail from './OrderDetail'

import 'styles/modules/nauh/leads'

class OrderTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])

    const {intl} = this.props

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.order.attrs.id.label'}),
        dataIndex: 'id',
        key: 'id',
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.user_id.label'}),
        dataIndex: 'user_id',
        key: 'user_id',
        render: value => {
          const {sharedState} = this.props
          return sharedState.getIn(['userIdMappings', `${value}`, 'username'])
        },
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.order_level_code.label'}),
        dataIndex: 'order_level.code',
        key: 'order_level_code',
        render: value => (<Tag color={LEVEL_COLOR_MAPPINGS[value]}>{value}</Tag>)
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.product.label'}),
        dataIndex: 'product_id',
        key: 'product_id',
        width: '40%',
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
        title: intl.formatMessage({id: 'attrs.order.attrs.promotion_price.label'}),
        dataIndex: 'promotion_price',
        key: 'promotion_price',
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.payment_method.label'}),
        dataIndex: 'payment.payment_method.name',
        key: 'payment_method_name',
      }
    ]
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, editState, location} = this.props
    const {current, pageSize, total} = pagination

    const lead = editState.get('lead')
    let leadOrderParams = getFilterParams(editState.get('orderFilters'))
    if(current != leadOrderParams.page) {
      leadOrderParams.page = current
    }

    actions.fetchOrders({...leadOrderParams, lead_id: lead.get('id')})
  }


  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const leadOrderParams = getFilterParams(editState.get('orderFilters'))
    actions.fetchOrders({...leadOrderParams, lead_id: lead.get('id')})
  }

  render() {
    const {editState, intl} = this.props
    const orders = editState.get('orders')
    const paging = editState.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = editState.get('isFetchingOrders')
    
    return (
      <div>
        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={orders.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingOrders}
          expandedRowRender={record => {
            const order = Immutable.fromJS(record)
            return (<OrderDetail order={order}/>)
          }}
        />
      </div>
    );
  }
}

export default injectIntl(OrderTableBox)