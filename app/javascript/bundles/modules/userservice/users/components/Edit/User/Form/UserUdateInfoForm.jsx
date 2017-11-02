import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const { TextArea } = Input

class UserUdateInfoForm extends React.Component {
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
    const user = editState.get('user')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (onSubmit) { onSubmit(values) }
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const user = editState.get('user')
    const isUpdatingUser = editState.get('isUpdatingUser')
    const isFetchingUser = editState.get('isFetchingUser')

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
        {isFetchingUser && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {user && !user.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">

                <FormItem label={intl.formatMessage({id: 'attrs.email.label'})} {...DEFAULT_FORM_ITEM_LAYOUT}>
                  <Input disabled value={user.get('basic_profile').get('email')}/>
                </FormItem>

                <FormItem label={intl.formatMessage({id: 'attrs.first_name.label'})} {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('first_name', {
                    initialValue: user.get('first_name')
                  })(<Input />)}
                </FormItem>

                <FormItem label={intl.formatMessage({id: 'attrs.last_name.label'})} {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('last_name', {
                    initialValue: user.get('last_name')
                  })(<Input />)}
                </FormItem>

                <FormItem label={intl.formatMessage({id: 'attrs.mobile.label'})} {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('mobile', {
                    initialValue: user.get('mobile')
                  })(<Input />)}
                </FormItem>

                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingUser}>
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

export default Form.create()(injectIntl(UserUdateInfoForm))