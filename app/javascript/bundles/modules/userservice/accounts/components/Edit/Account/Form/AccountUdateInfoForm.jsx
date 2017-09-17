import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class AccountUdateInfoForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

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
                <FormItem label="Email" {...this.formItemLayout}>
                  <Input disabled value={account.get('email')}/>
                </FormItem>
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    initialValue: account.get('name')
                  })(<Input />)}
                </FormItem>
                <FormItem  {...this.buttonItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingAccount}>
                    Update
                  </Button>
                  <Button type="default" style={{marginLeft: '4px'}} onClick={this.handleBack}>
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

export default Form.create()(AccountUdateInfoForm)