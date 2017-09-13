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
          <Alert message={message} type={type} key={`${type}${message}`}/>
        ))}
      </div>
    )
  }
}

export default AlertBox