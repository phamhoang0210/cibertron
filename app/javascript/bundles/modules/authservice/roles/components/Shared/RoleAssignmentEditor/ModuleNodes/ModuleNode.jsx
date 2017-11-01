import React from 'react'
import _ from 'lodash'
import { Row, Col, Icon, Button, Collapse } from 'antd'
import EntityNodesBox from './EntityNodes/EntityNodesBox'

const Panel = Collapse.Panel

class ModuleNode extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {name, keyNames, permissions} = this.props

    return (
      <Row>
        <EntityNodesBox
          {...this.props}
          name={name}
          keyNames={keyNames}
          permissions={permissions}
        />
      </Row>
    )
  }
}

export default ModuleNode