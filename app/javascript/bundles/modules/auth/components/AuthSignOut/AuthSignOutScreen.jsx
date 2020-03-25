import { SIGN_IN_PATH, SIGN_OUT_PATH } from 'app/constants/paths'
import React from 'react'
import { notification } from 'antd'
import _ from 'lodash'

class AuthSignOutScreen extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'onSignOutSuccess'
    ])
  }

  componentDidMount() {
    const {actions} = this.props
    actions.signOut(this.onSignOutSuccess)
  }

  onSignOutSuccess() {
    notification['success']({
      message: 'Logout successful!'
    })

    window.location.href = SIGN_IN_PATH
  }

  render() {
    return (
      <div/>
    )
  }
}

export default AuthSignOutScreen