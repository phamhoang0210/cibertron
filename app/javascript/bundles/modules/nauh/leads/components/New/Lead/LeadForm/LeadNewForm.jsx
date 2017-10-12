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

class LeadNewForm extends React.Component {
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
        actions.createLead({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLead = newState.get('isCreatingLead')
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
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.email.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'form.form_item.email.errors.required'}),
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.mobile.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('mobile', {
                  rules: [
                    {required: true, message: intl.formatMessage({id: 'form.form_item.mobile.errors.required'}) }
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name')(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.address.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('address')(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.interest.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('interest')(<TextArea />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'form.form_item.note.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('note')(<TextArea />)}
              </FormItem>
              <FormItem 
                label={intl.formatMessage({id: 'form.form_item.lead_level_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('lead_level_id', {
                  rules: [
                    { required: true, message: intl.formatMessage({id: 'form.form_item.lead_level_id.errors.required'}) }
                  ],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'form.form_item.lead_level_id.placeholder'})}
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
                label={intl.formatMessage({id: 'form.form_item.care_status_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('care_status_id', {
                  rules: [
                    { required: true, message: intl.formatMessage({id: 'form.form_item.care_status_id.errors.required'}) }
                  ],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'form.form_item.care_status_id.placeholder'})}
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
                label={intl.formatMessage({id: 'form.form_item.staff_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('staff_id')(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage({id: 'form.form_item.staff_id.placeholder'})}
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
                  loading={isCreatingLead}
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
      </div>
    );
  }
}

export default Form.create()(injectIntl(LeadNewForm))