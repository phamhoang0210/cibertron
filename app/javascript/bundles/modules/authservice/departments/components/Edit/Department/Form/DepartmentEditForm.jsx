import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item

class DepartmentEditForm extends React.Component {
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
    const {actions, editState} = this.props
    const department = editState.get('department')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateDepartment(department.get('id'), {department: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const department = editState.get('department')
    const companies = sharedState.get('companies')
    const supDepartments = sharedState.get('supDepartments')
    const isUpdatingDepartment = editState.get('isUpdatingDepartment')
    const isFetchingDepartment = editState.get('isFetchingDepartment')
    
    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingDepartment && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {department && !department.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.name.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.name.errors.required'})
                    }],
                    initialValue: department.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.name.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                  {getFieldDecorator('priority', {
                    initialValue: department.get('priority'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.description.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('description', {
                    initialValue: department.get('description')
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.company.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('company_id', {
                    initialValue: `${department.getIn(['company', 'id'])}`
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder={intl.formatMessage({id: 'attrs.company.placeholder.select.single'})}
                    >
                      {companies.map(company => (
                        <Option value={`${company.get('id')}`} key={company.get('id')}>
                          {company.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.sup_department.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('sup_department_id', {
                    initialValue: `${department.getIn(['sup_department', 'id'])}`
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder={intl.formatMessage({id: 'attrs.department.placeholder.select.single'})}
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
                  <Button type="primary" htmlType="submit" loading={isUpdatingDepartment}>
                    {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                    {intl.formatMessage({id: 'form.form_item.button.back.text'})}
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

export default Form.create()(injectIntl(DepartmentEditForm))