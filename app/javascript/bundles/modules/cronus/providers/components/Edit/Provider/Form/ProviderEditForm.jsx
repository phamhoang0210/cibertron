import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item

class ProviderEditForm extends React.Component {
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
    const provider = editState.get('provider')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateProvider(provider.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const provider = editState.get('provider')
    const isUpdatingProvider = editState.get('isUpdatingProvider')
    const isFetchingProvider = editState.get('isFetchingProvider')
    
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
        {isFetchingProvider && (
          <div className="main-content-form-box-search-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {provider && !provider.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.name.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.name.errors.required'}) }
                    ],
                    initialValue: provider.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.code.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('code', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.code.errors.required'}) }
                    ],
                    initialValue: provider.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingProvider}>
                    {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                  </Button>
                  <Button
                    type="default"
                    className="button-margin--left--default"
                    onClick={this.handleBack}
                  >
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

export default Form.create()(injectIntl(ProviderEditForm))