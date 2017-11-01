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

    const {role} = this.props
    const permissions = role.getIn(['assignment', 'permissions'])

    this.state = { permissions }

    _.bindAll(this, [
      'updatePermission',
      'deletePermission',
      'addPermission',
      'onUpdateState',
    ])
  }

  updatePermission(key, value) {
    const {permissions} = this.state
    const newPermission = permissions.updateIn(key.split('.'), currentValue => value)

    this.setState({permissions: newPermission}, this.onUpdateState)
  }

  deletePermission(key) {
    const {permissions} = this.state
    const newPermission = permissions.deleteIn(key.split('.'))

    this.setState({permissions: newPermission}, this.onUpdateState)
  }

  addPermission(key, value) {
    const {permissions} = this.state
    const newPermission = permissions.mergeDeepIn(key.split('.'), value)

    this.setState({permissions: newPermission}, this.onUpdateState)
  }

  onUpdateState() {
    const {permissions} = this.state
    const {onChange} = this.props
    if(onChange) {
      onChange(permissions.toJS())
    }
  }

  render() {
    const {role, sharedState} = this.props
    const {permissions} = this.state

    return (
      <Row>
        <ModuleNodesBox
          permissions={permissions}
          sharedState={sharedState}
          updatePermission={this.updatePermission}
          deletePermission={this.deletePermission}
          addPermission={this.addPermission}
        />
      </Row>
    )
  }
}

export default RoleAssignmentEditorBox