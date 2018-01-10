import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class TemplateNewForm extends React.Component {
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
    const templateId = editState.getIn(['template', 'id'])
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateTemplate(templateId, {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = editState.get('alert')
    const isUpdatingTemplate = editState.get('isUpdatingTemplate')
    const template = editState.get('template')

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
        <Row gutter={16}>
          <Col span={10}>
            {template && !template.isEmpty() && (
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.name.errors.required'},
                    ),
                  }],
                  initialValue: template.get('name')
                })(<Input />)}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.content.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('content', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.content.errors.required'},
                    ),
                  }],
                  initialValue: template.get('content')
                })(<TextArea rows={15} />)}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingTemplate}
                >
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button
                  className="button-margin--left--default"
                  type="default"
                  onClick={this.handleBack}
                >
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>)}
          </Col>

          <Col span={14}>
            <div style={{overflow: 'scroll', height: '80vh'}} dangerouslySetInnerHTML={{__html: getFieldValue('content')}}/>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Form.create()(injectIntl(TemplateNewForm))