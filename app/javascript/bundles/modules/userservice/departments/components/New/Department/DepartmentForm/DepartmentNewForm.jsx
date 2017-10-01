import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class DepartmentNewForm extends React.Component {
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createDepartment({department: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const companies = sharedState.get('companies')
    const supDepartments = sharedState.get('supDepartments')
    const isCreatingDepartment = newState.get('isCreatingDepartment')
    
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
              <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Priority" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('priority')(<Input />)}
              </FormItem>
              <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('description')(<TextArea />)}
              </FormItem>
              <FormItem label="Company" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('company_id')(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder="Please select a company"
                  >
                    {companies.map(company => (
                      <Option value={`${company.get('id')}`} key={company.get('id')}>
                        {company.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Department" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('sup_department_id')(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder="Please select a super department"
                  >
                    {supDepartments.map(department => (
                      <Option value={`${department.get('id')}`} key={department.get('id')}>
                        {department.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingDepartment}>
                  Create
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
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

export default Form.create()(DepartmentNewForm)