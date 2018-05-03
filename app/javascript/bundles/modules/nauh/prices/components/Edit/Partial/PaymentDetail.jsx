import React from 'react'
import { injectIntl } from 'react-intl'
import { Row, Col } from 'antd'

class PaymentDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {intl, sharedState, editState} = this.props
    
    return (
      <div className="box box-with-border box-with-shadow">
        <div className="box-header">
          <h3 className="box-title">Thông tin payment</h3>
        </div>
        <div className="box-body">
        </div>
      </div>
    )
  }
}

export default injectIntl(PaymentDetail)