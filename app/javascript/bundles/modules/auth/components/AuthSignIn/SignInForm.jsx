import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Row, Col, notification } from 'antd'
import {SIGN_UP_PATH} from 'app/constants/paths'
// import {GoogleLogin} from 'react-google-login'
// import OauthGrant from './OauthGrant'
import request from 'libs/requests/request'
import {setCredentials} from '../../../../../helpers/auth/authHelper'

class SignInForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
      'onSignInSuccess'
    ]);
    this.state = {isAuthenticated: false,
    url: "", scope: ""}
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.signIn(values, this.onSignInSuccess);
      }
    });
  }

  onSignInSuccess(data) {
    notification['success']({
      message: 'Login successful!'
    })

    const {location} = this.props
    const redirectUrl = location.query.redirect_url

    setTimeout(() => {
      if(redirectUrl && !RegExp('sign_out|sign_in').test(redirectUrl)) {
        window.location.href = redirectUrl
      } else {
        window.location.href = '/authservice/accounts'
      }
    }, 1000)
  }

render() {
    const { getFieldDecorator } = this.props.form
    const {authSignInState} = this.props
    const isSigning = authSignInState.get('isSigning')
    const responseGoogle = (response) => {
      var profileObj = response['profileObj'];
      var tokenObj = response['tokenObj'];
      var params_auth = {
        'profileObj'  : {
                          'googleId'    : profileObj['googleId'],
                          'name'        : profileObj['name'],
                          'email'       : profileObj['email']
                        },
        'tokenObj'    : {
                          'id_token'    : tokenObj['id_token'],
                          'access_token': tokenObj['access_token']
                        },
        'provider'    : response['provider']
      };
      return request
        .fetchEntities(`${AUTHSERVICE_BASE_URL}/auth/google_oauth2/callback`, params_auth)
        .then(res => {
          var cookie = res.data
          var urlParams = new URLSearchParams(window.location.search)
          var redirectUrl = urlParams.get("redirect_url")
          document.cookie = "access-token" + "=" + cookie['access-token'] + ";domain=localhost;path=/"
          document.cookie = "client" + "=" + cookie['client'] + ";domain=localhost;path=/"
          document.cookie = "uid" + "=" + cookie['uid'] + ";domain=localhost;path=/"
          setCredentials(cookie)
          if(redirectUrl && !RegExp('sign_out|sign_in').test(redirectUrl)) {
            window.location.href = redirectUrl
          } else {
            window.location.href = '/'
          }
        })
        .catch(error => {})
    }
    const disableGetAuth = () => {
      window.gapi.auth2.getAuthInstance().disconnect()
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
         {/* <a className="login-form-forgot" href="">Forgot password</a>*/}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isSigning}
            loading={isSigning}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignInForm)
