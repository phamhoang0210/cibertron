import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Row, Col, notification } from 'antd'
import {Link} from 'react-router'
import {SIGN_UP_PATH} from 'app/constants/paths'
import {GoogleLogin} from 'react-google-login'
import request from 'libs/requests/request'
import * as authHelper  from 'helpers/auth/authHelper'

class SignInForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
      'onSignInSuccess'
    ])
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
        window.location.href = '/'
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
          var myDate = new Date()
          var urlParams = new URLSearchParams(window.location.search)
          var redirectUrl = urlParams.get("redirect_url")
          var expires = myDate.setDate(1)
          document.cookie = "access-token" + "=" + cookie['access-token'] + ";domain=.edumall.io;path=/"
          document.cookie = "client" + "=" + cookie['client'] + ";domain=.edumall.io;path=/"
          document.cookie = "uid" + "=" + cookie['uid'] + ";domain=.edumall.io;path=/"
          if(redirectUrl && !RegExp('sign_out|sign_in').test(redirectUrl)) {
            if(urlParams.has("response_type") === true || urlParams.has("client_id") === true || urlParams.has("redirect_uri") === true || urlParams.has("scope") === true){
              var response_type = urlParams.get("response_type")
              var client_id = urlParams.get("client_id")
              var scope = urlParams.get("scope")
              var redirectUri = urlParams.get("redirect_uri")
              var state = "login_success"
              var url = redirectUrl + "?" + "response_type=" + response_type + "&" + "client_id=" + client_id + "&" + "redirect_uri=" + redirectUri + "&" + "scope=" + scope + "&" + "state=" + state
              debugger
              window.location.href = url
            } else {
              window.location.href = redirectUrl
            }
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
          {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isSigning}
            loading={isSigning}
          >
            Log in
          </Button>
            <GoogleLogin
              clientId="756159619050-e6fc577akgdnukparqn0a4qsctdei4k2.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              className="ant-btn login-form-button ant-btn-danger"
              onRequest={disableGetAuth}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />

         {/*Or <Link to={SIGN_UP_PATH}>register now!</Link>*/}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignInForm)
