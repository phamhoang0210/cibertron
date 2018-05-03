import React from 'react'
import { injectIntl } from 'react-intl'
import { Row, Col } from 'antd'
import OrderLevelSteps from './Partial/OrderLevelSteps'
import PaymentDetail from './Partial/PaymentDetail'
import OrderDetail from './Partial/OrderDetail'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchOrder(params.id, {fields: 'order_level{}'})
    actions.fetchOrderLevels({per_page: 'infinite'})
  }

  render() {
    const {intl, sharedState, editState} = this.props
    return (
      <div className="main-content nauh--leads--new box">
        <div className="box-body">
          <Row gutter={24}>
            <Col span={6}>
              <OrderLevelSteps {...this.props}/>
            </Col>
            <Col span={18}>
              <OrderDetail {...this.props}/>
              <PaymentDetail {...this.props}/>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)