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
    const leadStatuses = sharedState.get('leadStatuses')
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
                label={intl.formatMessage({id: 'attrs.email.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage(
                      {id: 'attrs.email.errors.required'},
                    ),
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.mobile.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(
                        {id: 'attrs.mobile.errors.required'},
                      )
                    }
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name')(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.address.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('address')(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.interest.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('interest')(<TextArea />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.note.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('note')(<TextArea />)}
              </FormItem>
              <FormItem 
                label={intl.formatMessage({id: 'attrs.lead_level_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('lead_level_id', {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(
                        {id: 'attrs.lead_level_id.errors.required'},
                      )
                    }
                  ],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage(
                      {id: 'attrs.lead_level_id.placeholder.select.single'},
                    )}
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
                label={intl.formatMessage({id: 'attrs.lead_status_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('lead_status_id', {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(
                        {id: 'attrs.lead_status_id.errors.required'},
                      )
                    }
                  ],
                })(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage(
                      {id: 'attrs.lead_status_id.placeholder.select.single'},
                    )}
                    filterOption={selectFilterOption}
                  >
                    {leadStatuses.map(leadStatus => (
                      <Option value={`${leadStatus.get('id')}`} key={leadStatus.get('id')}>
                        {leadStatus.get('code')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.staff_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('staff_id')(
                  <Select
                    showSearch
                    placeholder={intl.formatMessage(
                      {id: 'attrs.staff_id.placeholder.select.single'},
                    )}
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