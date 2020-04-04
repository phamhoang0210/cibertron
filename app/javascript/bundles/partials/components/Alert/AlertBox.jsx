import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import {Alert} from 'antd'

class AlertBox extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(Immutable.List).isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const { messages, type } = this.props
    return (
      <div>
        <Alert
          style={{marginTop: '2px', marginButton: '2px'}}
          key={`${type}${messages}`}
          message={messages}
          type={type}
        />
      </div>
    )
  }
}

export default AlertBox