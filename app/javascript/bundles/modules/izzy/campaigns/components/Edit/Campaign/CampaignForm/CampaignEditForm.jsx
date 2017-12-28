import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox, Popconfirm } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class CampaignEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'handleSendCampaign',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSendCampaign(){
    const {actions, editState} = this.props
    var campaignId = editState.getIn(['campaign', '_id', '$oid'])
    actions.sendCampaign({campaignId: campaignId})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    var campaignId = editState.getIn(['campaign', '_id', '$oid'])
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCampaign(campaignId, {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = editState.get('alert')
    const isUpdatingCampaign = editState.get('isUpdatingCampaign')
    const campaign = editState.get('campaign')

    const senders = sharedState.get('senders')
    const lists = sharedState.get('lists')
    const templates = sharedState.get('templates')

    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={12}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={12}>
            {campaign && !campaign.isEmpty() && (
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
                  initialValue: campaign.get('name')
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
                  initialValue: campaign.get('subject')
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
                  initialValue: campaign.get('sender_id')
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
                  initialValue: campaign.get('template_id')
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
                  initialValue: campaign.get('list_id')
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

              {/* Buttons item */}
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingCampaign}
                >
                  {intl.formatMessage({id: 'form.form_item.button.update.text'})}
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

          <Col span={12}>
            {campaign && !campaign.isEmpty() && (
              <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.send.title'})}
              onConfirm={() => this.handleSendCampaign()}
              okText="Yes"
              cancelText="No"
              >
              <Button
                style={{ width: '100px', height: '100px', marginLeft: '40%', marginTop: '10%' }}
                type="danger"
                shape="circle"
              >
                {intl.formatMessage({id: 'form.form_item.button.send_email.text'})}
              </Button>
            </Popconfirm>)}
          </Col>

        </Row>

      </div>
    );
  }
}

export default Form.create()(injectIntl(CampaignEditForm))