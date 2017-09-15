import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import AccountUdateInfoForm from './Form/AccountUdateInfoForm'
import AccountChangePasswordForm from './Form/AccountChangePasswordForm'
import AccountUpdateRoleForm from './Form/AccountUpdateRoleForm'
const { TabPane } = Tabs

class AccountEditBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit'
    ])
  }

  handleSubmit(data) {
    const {actions, editState} = this.props
    const account = editState.get('account')
    actions.updateAccount(account.get('id'), {account: data})
  }

  render() {
    return (
      <Tabs defaultActiveKey="update-infomation">
        <TabPane tab="Update infomation" key="update-infomation">
          <AccountUdateInfoForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
        <TabPane tab="Update role" key="update-role">
          <AccountUpdateRoleForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
        <TabPane tab="Change password" key="change-password">
          <AccountChangePasswordForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
      </Tabs>
    )
  }
}

export default AccountEditBox