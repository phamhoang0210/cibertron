import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import AccountUdateInfoForm from './Form/AccountUdateInfoForm'
import AccountChangePasswordForm from './Form/AccountChangePasswordForm'
import AccountUpdateRoleForm from './Form/AccountUpdateRoleForm'
import { injectIntl } from 'react-intl'

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
    const {intl} = this.props

    return (
      <Tabs defaultActiveKey="update_infomation">
        <TabPane
          tab={intl.formatMessage({id: 'edit.tabs.tab.update_infomation.title'})}
          key="update_infomation"
        >
          <AccountUdateInfoForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({id: 'edit.tabs.tab.update_role.title'})}
          key="update_role"
        >
          <AccountUpdateRoleForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({id: 'edit.tabs.tab.change_password.title'})}
          key="change_password"
        >
          <AccountChangePasswordForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
      </Tabs>
    )
  }
}

export default injectIntl(AccountEditBox)