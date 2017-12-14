import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Row, Col, notification } from 'antd'
import {Link} from 'react-router'
import {SIGN_UP_PATH} from 'app/constants/paths'

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
         {/*Or <Link to={SIGN_UP_PATH}>register now!</Link>*/}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignInForm)