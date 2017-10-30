import React from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import UserUdateInfoForm from './Form/UserUdateInfoForm'
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
    return (
      <Tabs defaultActiveKey="update-infomation">
        <TabPane tab="Update infomation" key="update-infomation">
          <UserUdateInfoForm {...this.props} onSubmit={this.handleSubmit}/>
        </TabPane>
      </Tabs>
    )
  }
}

export default UserEditBox