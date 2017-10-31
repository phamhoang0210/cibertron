import React from 'react'
import _ from 'lodash'
import { Row, Col, Tree, Select, Input, Collapse } from 'antd'
import ModuleNodesBox from './ModuleNodes/ModuleNodesBox'

const TreeNode = Tree.TreeNode
const Option = Select.Option
const InputGroup = Input.Group
const Panel = Collapse.Panel

class RoleAssignmentEditorBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {role} = this.props
    const permissions = role.getIn(['assignment', 'permissions'])

    return (
      <Row>
        <ModuleNodesBox permissions={permissions}/>
      </Row>
    )
  }
}

export default RoleAssignmentEditorBox