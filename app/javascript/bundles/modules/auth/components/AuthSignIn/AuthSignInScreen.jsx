import React from 'react'
import _ from 'lodash'
import SignInForm from './SignInForm'
import { Alert } from 'antd'
import 'styles/auth/login'
import AlertBox from 'partials/components/Alert/AlertBox'

class AuthSignInScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {authSignInState} = this.props
    const alert = authSignInState.get('alert')
    
    return (
      <div className="login-form">
        <div className="login-form-logo">
          <img alt="Edumall logo"src="/assets/edumall-logo.png" />
          <span>LOGIN</span>
        </div>
        {alert && !alert.isEmpty() && (
          <div style={{marginBottom: '8px'}}>
            <AlertBox
              messages={alert.get('messages')}
              type={alert.get('type')}
            />
          </div>
        )}
        <SignInForm {...this.props}/>
      </div>
    )
  }
}

export default AuthSignInScreen