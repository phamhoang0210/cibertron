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
        {messages.map((message, index) => (
          <Alert
            style={{marginTop: '2px', marginButton: '2px'}}
            key={`${type}${message}`}
            message={message}
            type={type}
          />
        ))}
      </div>
    )
  }
}

export default AlertBox