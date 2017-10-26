import React from 'react'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'renderPaymentDetail'
    ])
  }

  render() {
    const {editState, intl} = this.props

    return (
      <div>
        <Tabs defaultActiveKey="payment_detail">
          <TabPane
            tab={intl.formatMessage({id: 'edit.lead.partial.orders_table.tabs.tab.orders.order_detail.tabs.tab.payment_detail.title'})}
            key="payment_detail"
          >
            {this.renderPaymentDetail()}
          </TabPane>
        </Tabs>
      </div>
    )
  }

  renderPaymentDetail() {
    const {order, intl} = this.props
    const paymentDetail = order.getIn(['payment', 'payment_detail'])
    let payment = []

    paymentDetail.forEach((v, k) => {
      if(v) {
        payment.push(
          <p key={k} style={{padding: '4px'}}>
            <span>
              {intl.formatMessage({id: `attrs.order.attrs.payment.attrs.payment_detail.attrs.${k}.label`})}
            </span>: <b>{v}</b>
          </p>
        )
      }
    })
    return (
      <div>
        {payment}
      </div>
    )
  }
}

export default injectIntl(OrderDetail)