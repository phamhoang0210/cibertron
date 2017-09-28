import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class LeadEditForm extends React.Component {
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
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLead(lead.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const lead = editState.get('lead')
    const isUpdatingLead = editState.get('isUpdatingLead')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const users = sharedState.get('users')
    
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
        {isFetchingLead && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {lead && !lead.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Email" {...this.formItemLayout}>
                  <Input value={lead.get('email')} disabled/>
                </FormItem>
                <FormItem label="Mobile" {...this.formItemLayout}>
                  <Input value={lead.get('mobile')} disabled/>
                </FormItem>
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    initialValue: lead.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Address" {...this.formItemLayout}>
                  {getFieldDecorator('address', {
                    initialValue: lead.get('address'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Level" {...this.formItemLayout}>
                  {getFieldDecorator('lead_level_id', {
                    rules: [{ required: true, message: 'Lead level is required!' }],
                    initialValue: `${lead.get('lead_level_id')}`,
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
                <FormItem label="Staff" {...this.formItemLayout}>
                  {getFieldDecorator('staff_id', {
                    initialValue: `${lead.get('staff_id')}`,
                  })(
                    <Select
                      showSearch
                      placeholder="Please select a staff"
                    >
                      {users.map(user => (
                        <Option value={`${user.get('id')}`} key={user.get('id')}>
                          {user.get('username')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...this.buttonItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingLead}>
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

export default Form.create()(LeadEditForm)