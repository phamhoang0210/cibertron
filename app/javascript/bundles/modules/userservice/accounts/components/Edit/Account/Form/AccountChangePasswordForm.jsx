import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'

const Option = Select.Option
const FormItem = Form.Item

class AccountChangePasswordForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState, onSubmit} = this.props
    const account = editState.get('account')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (onSubmit) { onSubmit(values) }
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const account = editState.get('account')
    const isUpdatingAccount = editState.get('isUpdatingAccount')
    const isFetchingAccount = editState.get('isFetchingAccount')
    
    return (
      <div style={{marginTop: '8px'}}>
        {alert && !alert.isEmpty() && (
          <Row style={{marginBottom: '8px'}}>
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingAccount && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {account && !account.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Password" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Password is required!' }],
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Password confirmation" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('password_confirmation', {
                    rules: [{ required: true, message: 'Password confirmation is required!' }],
                  })(<Input/>)}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingAccount}>
                    Save
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                    Back
                  </Button>
                </FormItem>
              </Form>
            )} 
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AccountChangePasswordForm)