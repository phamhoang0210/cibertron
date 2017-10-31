import React from 'react'
import _ from 'lodash'
import { Row, Col, Icon } from 'antd'

class ModuleNode extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }

    _.bindAll(this, [
      'toggleExpanded'
    ])
  }

  toggleExpanded() {
    const {isExpanded} = this.state

    this.setState({isExpanded: !isExpanded})
  }

  render() {
    const {name, permissions} = this.props
    const {isExpanded} = this.state

    return (
      <Row gutter={2}>
        <Col span={2}>
          <Icon type="close" />
        </Col>
        <Col span={22}>
          <Icon
            type={isExpanded ? 'caret-up' : 'caret-down'}
            onClick={this.toggleExpanded}
          />
          {name}
        </Col>
      </Row>
    )
  }
}

export default ModuleNode