import React from 'react'
import _ from 'lodash'
import { Row, Col, Icon } from 'antd'
import EntityNode from './EntityNode'

class EntityNodesBox extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {name, keyNames, permissions} = this.props
    const entityNodes = []

    permissions.forEach((v, k) => (
      entityNodes.push(
        <EntityNode
          {...this.props}
          key={k}
          name={k}
          keyNames={`${keyNames}.${k}`}
          permissions={v}
        />
      )
    ))

    return (
      <Row gutter={2}>
        {entityNodes}
      </Row>
    )
  }
}

export default EntityNodesBox