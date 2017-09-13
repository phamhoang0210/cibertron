import React from 'react'
import 'styles/layouts/layout'
import 'styles/layouts/auth/auth_layout'

class AuthLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="layout-wraper auth-layout">
        {this.props.children}
      </div>
    );
  }
}

export default AuthLayout