import React from 'react'
import _ from 'lodash'
import { Row, Col } from 'antd'
import ModuleNode from './ModuleNode'

class ModuleNodesBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {permissions} = this.props
    const permissionModuleNodes = []

    permissions.forEach((v, k) => {
      permissionModuleNodes.push(
        <ModuleNode key={k} name={k} permissions={v}/>
      )
    })

    return (
      <div>
        {permissionModuleNodes}
      </div>
    )
  }
}

export default ModuleNodesBox