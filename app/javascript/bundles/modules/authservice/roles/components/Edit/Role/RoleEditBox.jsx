import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import RoleEditForm from './Form/RoleEditForm'
import RoleAssignmentEditForm from './Form/RoleAssignmentEditForm'
import { injectIntl } from 'react-intl'

const { TabPane } = Tabs

class RoleEditBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit'
    ])
  }

  handleSubmit(values) {
    const {actions, editState} = this.props
    const role = editState.get('role')
    actions.updateRole(role.get('id'), {role: values})
  }

  render() {
    const {intl} = this.props

    return (
      <Tabs defaultActiveKey="role_basic">
        <TabPane
          tab={intl.formatMessage({id: 'edit.tabs.tab.role_basic.title'})}
          key="update_infomation"
        >
          <RoleEditForm
            {...this.props}
            onSubmit={this.handleSubmit}
          />
        </TabPane>
        <TabPane
          tab={intl.formatMessage({id: 'edit.tabs.tab.role_assignment.title'})}
          key="update_role"
        >
          <RoleAssignmentEditForm
            {...this.props}
            onSubmit={this.handleSubmit}
          />
        </TabPane>
      </Tabs>
    )
  }
}

export default injectIntl(RoleEditBox)