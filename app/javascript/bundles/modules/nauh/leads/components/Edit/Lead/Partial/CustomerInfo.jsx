import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker, Tabs } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea
const TabPane = Tabs.TabPane
const InputGroup = Input.Group

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
      'renderUpdateInfoTab',
      'renderHistoriesTab',
      'handleCall',
    ])
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLead(lead.get('id'), {record: values})
      }
    })
  }

  handleCall() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    actions.call(lead.get('id'))
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const lead = editState.get('lead')
    const isFetchingLead = editState.get('isFetchingLead')
    
    return (
      <div className="box">
        <div className="box-body">
          <Tabs defaultActiveKey="update_info">
            <TabPane
              tab={intl.formatMessage({id: 'edit.lead.partial.customer_info.tabs.tab.update_info.title'})}
              key="update_info"
            >
              {this.renderUpdateInfoTab()}
            </TabPane>
            <TabPane
              tab={intl.formatMessage({id: 'edit.lead.partial.customer_info.tabs.tab.histories.title'})}
              key="histories"
            >
              {this.renderHistoriesTab()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

  renderUpdateInfoTab() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const lead = editState.get('lead')
    const isCalling = editState.get('isCalling')
    const isUpdatingLead = editState.get('isUpdatingLead')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const careStatuses = sharedState.get('careStatuses')
    const users = sharedState.get('users')

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.email.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('email', {
                initialValue: lead.get('email'),
                rules: [{
                  required: true, message: intl.formatMessage({id: 'attrs.email.errors.required'}),
                }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.mobile.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              <InputGroup compact>
                {getFieldDecorator('mobile', {
                  initialValue: lead.get('mobile'),
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'attrs.mobile.errors.required'}),
                  }]
                })(<Input style={{width: '70%'}} size="large"/>)}
                <Button
                  icon="phone"
                  style={{width: '30%'}}
                  type="primary"
                  size="large"
                  onClick={this.handleCall}
                  loading={isCalling}
                >
                  {intl.formatMessage({id: 'form.form_item.button.call.text'})}
                </Button>
              </InputGroup>
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.name.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('name', {
                initialValue: lead.get('name'),
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.imported_at.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('imported_at', {
                initialValue: lead.get('imported_at') && moment(lead.get('imported_at')),
                rules: [{
                  required: true, message: intl.formatMessage({id: 'attrs.imported_at.errors.required'}),
                }]
              })(<DatePicker className="width--full"/>)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.address.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('address', {
                initialValue: lead.get('address'),
              })(<Input />)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.note.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('note', {
                initialValue: lead.get('note'),
              })(<TextArea />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
          </Col>
          <Col span={8} className="text-align--right">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdatingLead}
            >
              {intl.formatMessage({id: 'form.form_item.button.update.text'})}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }

  renderHistoriesTab() {
    return (
      <div>Histories</div>
    )
  }
}

export default Form.create()(injectIntl(CustomerInfo))