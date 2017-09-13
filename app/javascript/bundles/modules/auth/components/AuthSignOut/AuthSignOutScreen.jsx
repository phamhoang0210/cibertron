import React from 'react'
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
    window.location.href = '/'
  }

  render() {
    return (
      <div/>
    )
  }
}

export default AuthSignOutScreen