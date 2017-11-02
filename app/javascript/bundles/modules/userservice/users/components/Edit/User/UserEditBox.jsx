import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import UserUdateInfoForm from './Form/UserUdateInfoForm'
import { injectIntl } from 'react-intl'

const { TabPane } = Tabs

class UserEditBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit'
    ])
  }

  handleSubmit(data) {
    const {actions, editState} = this.props
    const user = editState.get('user')
    actions.updateUser(user.get('id'), {user: data, fields: 'basic_profile{}'})
  }

  render() {
    const {intl} = this.props
    return (
      <Tabs defaultActiveKey="update-infomation">
        <TabPane tab={intl.formatMessage({id: 'edit.tabs.tab.update_infomation.title'})} key="update-infomation">
          <UserUdateInfoForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
      </Tabs>
    )
  }
}

export default injectIntl(UserEditBox)