import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class LeadEditForm extends React.Component {
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
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLead(lead.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const lead = editState.get('lead')
    const isUpdatingLead = editState.get('isUpdatingLead')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const careStatuses = sharedState.get('careStatuses')
    const users = sharedState.get('users')
    
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
        {isFetchingLead && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {lead && !lead.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.email.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  <Input value={lead.get('email')} disabled/>
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.mobile.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  <Input value={lead.get('mobile')} disabled/>
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.name.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('name', {
                    initialValue: lead.get('name'),
                  })(<Input />)}
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
                  label={intl.formatMessage({id: 'attrs.interest.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('interest', {
                    initialValue: lead.get('interest'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.note.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('note', {
                    initialValue: lead.get('note'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.imported_at.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('imported_at', {
                    initialValue: lead.get('imported_at') && moment(lead.get('imported_at')),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.assigned_at.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('assigned_at', {
                    initialValue: lead.get('assigned_at') && moment(lead.get('assigned_at')),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.lead_level_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('lead_level_id', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.lead_level_id.errors.required'}) }
                    ],
                    initialValue: `${lead.get('lead_level_id')}`,
                  })(
                    <Select
                      showSearch
                      placeholder={intl.formatMessage({id: 'attrs.lead_level_id.placeholder.select.single'})}
                      filterOption={selectFilterOption}
                    >
                      {leadLevels.map(leadLevel => (
                        <Option value={`${leadLevel.get('id')}`} key={leadLevel.get('id')}>
                          {leadLevel.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.care_status_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('care_status_id', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.care_status_id.errors.required'}) }
                    ],
                    initialValue: `${lead.get('care_status_id')}`,
                  })(
                    <Select
                      showSearch
                      placeholder={intl.formatMessage({id: 'attrs.care_status_id.placeholder.select.single'})}
                      filterOption={selectFilterOption}
                    >
                      {careStatuses.map(careStatus => (
                        <Option value={`${careStatus.get('id')}`} key={careStatus.get('id')}>
                          {careStatus.get('code')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.staff_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('staff_id', {
                    initialValue: `${lead.get('staff_id')}`,
                  })(
                    <Select
                      showSearch
                      placeholder={intl.formatMessage({id: 'attrs.staff_id.placeholder.select.single'})}
                      filterOption={selectFilterOption}
                    >
                      {users.map(user => (
                        <Option value={`${user.get('id')}`} key={user.get('id')}>
                          {user.get('username')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isUpdatingLead}
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
              </Form>
            )} 
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(LeadEditForm))