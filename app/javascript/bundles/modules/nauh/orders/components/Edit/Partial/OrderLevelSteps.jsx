import React from 'react'
import { injectIntl } from 'react-intl'
import { Row, Col, Steps } from 'antd'
const Step = Steps.Step

class OrderLevelSteps extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {intl, sharedState, editState} = this.props
    const orderLevels = sharedState.get('orderLevels').sortBy(lv => lv.get('level'))
    const currentLevelCode = editState.getIn(['order', 'order_level', 'code'])
    const currentLevelIndex = orderLevels.findIndex(lv => lv.get('code') == currentLevelCode)
    
    return (
      <div className="box box-with-border box-with-shadow">
        <div className="box-header">
          <h1 className="box-title">
            Trạng thái
          </h1>
        </div>
        <div className="box-body">
          <Steps direction="vertical" current={currentLevelIndex}>
            {orderLevels.map(orderLevel => (
              <Step
                key={orderLevel.get('code')}
                title={orderLevel.get('name')}
                description={orderLevel.get('description')}
              />
            ))}
          </Steps>
        </div>
      </div>
      
    )
  }
}

export default injectIntl(OrderLevelSteps)