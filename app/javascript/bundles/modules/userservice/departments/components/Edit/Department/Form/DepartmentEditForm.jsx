import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class DepartmentEditForm extends React.Component {
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
    const department = editState.get('department')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateDepartment(department.get('id'), {department: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const department = editState.get('department')
    const users = sharedState.get('users')
    const isUpdatingDepartment = editState.get('isUpdatingDepartment')
    const isFetchingDepartment = editState.get('isFetchingDepartment')
    
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
        {isFetchingDepartment && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {department && !department.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: department.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Priority" {...this.formItemLayout}>
                  {getFieldDecorator('priority', {
                    initialValue: department.get('priority'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Description" {...this.formItemLayout}>
                  {getFieldDecorator('description', {
                    initialValue: department.get('description')
                  })(<TextArea />)}
                </FormItem>
                <FormItem label="Manager" {...this.formItemLayout}>
                  {getFieldDecorator('manager_id', {
                    initialValue: `${department.get('manager_id')}`
                  })(
                    <Select
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      placeholder="Please select a manager"
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
                  <Button type="primary" htmlType="submit" loading={isUpdatingDepartment}>
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

export default Form.create()(DepartmentEditForm)