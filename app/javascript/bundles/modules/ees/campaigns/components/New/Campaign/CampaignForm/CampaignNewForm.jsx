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

class CampaignNewForm extends React.Component {
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
        actions.createCampaign({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const senders = sharedState.get('senders')
    const lists = sharedState.get('lists')
    const templates = sharedState.get('templates')

    const isCreatingCampaign = newState.get('isCreatingCampaign')
    
    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={9} offset={3}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              
              {/* Name item */}
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

            {/* Subject item */}
              <FormItem
                label={intl.formatMessage({id: 'attrs.subject.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('subject', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.subject.errors.required'},
                    ),
                  }],
                })(<Input />)}
              </FormItem>

              {/* Sender item */}
              <FormItem
                label={intl.formatMessage({id: 'attrs.sender.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('sender_id', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.sender.errors.required'},
                    ),
                  }],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'attrs.sender.placeholder'})}
                      optionFilterProp="children"
                    // onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {senders && senders.map((sender, index) => {
                      return (
                        <Option value={sender.get('id')} key={index}>{`${sender.get('name')}`}</Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>

            {/* Template item*/}
              <FormItem
                label={intl.formatMessage({id: 'attrs.template.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('template_id', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.template.errors.required'},
                    ),
                  }],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'attrs.template.placeholder'})}
                    optionFilterProp="children"
                    // onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {templates && templates.map((template, index) => {
                      return (
                        <Option value={template.get('id')} key={index}>{`${template.get('name')}`}</Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>

              {/* List item */}
              <FormItem
                label={intl.formatMessage({id: 'attrs.list.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('list_id', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.list.errors.required'},
                    ),
                  }],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'attrs.list.placeholder'})}
                    optionFilterProp="children"
                    // onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {lists && lists.map((list, index) => {
                      return (
                        <Option value={list.get('id')} key={index}>{`${list.get('name')}`}</Option>
                      );
                    })}
                  </Select>
                )}
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
          <Col span={12}>
            
          </Col>
        </Row>

      </div>
    );
  }
}

export default Form.create()(injectIntl(CampaignNewForm))