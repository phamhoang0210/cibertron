import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class LeadNewForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

    this.formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
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
        actions.createLead({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLead = newState.get('isCreatingLead')
    const leadLevels = sharedState.get('leadLevels')
    
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
              <FormItem label="Mobile" {...this.formItemLayout}>
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: 'Mobile is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Name" {...this.formItemLayout}>
                {getFieldDecorator('name')(<Input />)}
              </FormItem>
              <FormItem label="Address" {...this.formItemLayout}>
                {getFieldDecorator('address')(<Input />)}
              </FormItem>
              <FormItem label="Level" {...this.formItemLayout}>
                {getFieldDecorator('lead_level_id', {
                  rules: [{ required: true, message: 'Lead level is required!' }],
                })(
                  <Select
                    showSearch
                    placeholder="Please select a level"
                  >
                    {leadLevels.map(leadLevel => (
                      <Option value={`${leadLevel.get('id')}`} key={leadLevel.get('id')}>
                        {leadLevel.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...this.buttonItemLayout}>
                <Button type="primary" htmlType="submit" loading={isCreatingLead}>
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

export default Form.create()(LeadNewForm)