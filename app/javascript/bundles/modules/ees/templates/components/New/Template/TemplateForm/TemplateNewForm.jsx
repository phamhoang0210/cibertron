import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox, Icon } from 'antd'
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
    const {actions} = this.props
    actions.resetAlert()
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createTemplate({record: values})
      }
    })
  }

  renderMessage(){
    return (
      <div>
        <h3><Icon type="smile" /> Cung cấp cụ thể địa chỉ, thông tin liên hệ của Edumall ở phần footer của email template.</h3>
        <h3><Icon type="smile-o" /> Template khi tạo phải có thẻ Unsubscribe: <b>{"{ees_unsubscribes}"}</b> Ví dụ: </h3>
        <h3><Icon type="exclamation" /> (Đây là ví dụ, không phải mẫu, không khuyến khích copy, nên chỉnh sửa lại cho phù hợp template) </h3>
        <Alert
          description={"<div style=\"font-size: 16px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center;\"><div class=\"our-class\"> Bỏ theo dõi, click <a href=\"{ees_unsubscribes}\">Đây</a> </div></div>"}
          type="success"
        />
      </div>
    )
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingCampaign = newState.get('isCreatingCampaign')
    
    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={15} offset={5}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={20}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.name.errors.required'},
                    ),
                  }],
                })(<Input />)}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.type.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('type', {
                  initialValue: 'Template::Marketing',
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.type.errors.required'},
                    ),
                  }],
                })(
                  <Select>
                    <Option value="Template::Marketing">Marketing</Option>
                    <Option value="Template::Transactional">Transactional</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.content.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('content', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.content.errors.required'},
                    ),
                  }],
                })(<TextArea rows={15} />)}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreatingCampaign}
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
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={15} offset={5}>
            <Alert
              message="Có thể bạn đã biết"
              description={this.renderMessage()}
              type="info"
              showIcon
            />
          </Col>
        </Row>

      </div>
    );
  }
}

export default Form.create()(injectIntl(TemplateNewForm))