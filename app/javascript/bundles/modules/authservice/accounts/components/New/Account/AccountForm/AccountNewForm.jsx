import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item

class AccountNewForm extends React.Component {
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
        actions.createAccount({account: values})
      }
    })
  }

  render() {
    const {newState, sharedState, intl} = this.props
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
              <FormItem
                label={intl.formatMessage({id: 'attrs.email.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.email.errors.required'}),
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name')(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.department.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('department_id', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.department.errors.required'})
                  }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder={intl.formatMessage({id: 'attrs.department.placeholder.select.single'})}
                  >
                    {departments.map(department => (
                      <Option value={`${department.get('id')}`} key={department.get('id')}>
                        {department.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.password.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.password.errors.required'}),
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingAccount}>
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AccountNewForm))