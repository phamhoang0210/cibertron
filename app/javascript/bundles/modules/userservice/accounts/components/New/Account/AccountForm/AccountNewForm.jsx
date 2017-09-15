import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class AccountNewForm extends React.Component {
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createAccount({account: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingAccount = newState.get('isCreatingAccount')

    const departments = sharedState.get('departments')
    
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
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem label="Email" {...this.formItemLayout}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Email is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Name" {...this.formItemLayout}>
                {getFieldDecorator('name')(<Input />)}
              </FormItem>
              <FormItem label="Department" {...this.formItemLayout}>
                {getFieldDecorator('department_id', {
                  rules: [{ required: true, message: 'Department is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a department"
                  >
                    {departments.map(department => (
                      <Option value={`${department.get('id')}`} key={department.get('id')}>
                        {department.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Password" {...this.formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem  {...this.buttonItemLayout}>
                <Button type="primary" htmlType="submit" loading={isCreatingAccount}>
                  Create
                </Button>
                <Button type="default" style={{marginLeft: '4px'}} onClick={this.handleBack}>
                  Back
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AccountNewForm)