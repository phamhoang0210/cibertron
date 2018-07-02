import React from 'react'
import _ from 'lodash'
import { Form, Input, Select, Button, Checkbox } from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option

class LeadAssignFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
    this.state = {is_recovery:[false,null]}
    this.onCheckCheckbox = this.onCheckCheckbox.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const {form, actions} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        values.is_recovery = this.state.is_recovery
        actions.assignLeads(values)
      }
    })
  }
  onCheckCheckbox(e) {
    const {form, actions} = this.props
    if (e.target.checked == true) {
        this.state.is_recovery = true;
        actions.fetchLeadReport({fillter:{is_recovery:true}})
    } else {
      this.state.is_recovery = false;
      actions.fetchLeadReport({fillter:{is_recovery:[false,null]}})
    }

  }

  render() {
    const {actions, assignState, sharedState, intl} = this.props
    const users = sharedState.get('users')
    const isAssigningLeads = assignState.get('isAssigningLeads')
    const { getFieldDecorator } = this.props.form

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          <Checkbox onChange={(e) => this.onCheckCheckbox(e)}>{'Contact Thu hồi'}</Checkbox>
        </FormItem>

        <FormItem label={intl.formatMessage({id: 'assign.leads_form.form_item.numbers.label'})}>
          {getFieldDecorator('numbers')(
            <Input
              style={{ width: '100px' }}
              type="number"
              placeholder={intl.formatMessage({id: 'assign.leads_form.form_item.numbers.placeholder.input'})}
            />
          )}
        </FormItem>
        <FormItem label={intl.formatMessage({id: 'assign.leads_form.form_item.staff.label'})}>
          {getFieldDecorator('staff_id', {
            rules: [
              { required: true, message: intl.formatMessage({id: 'assign.leads_form.form_item.staff.errors.required'})}
            ],
          })(
            <Select
              showSearch
              filterOption={selectFilterOption}
              style={{ width: '200px' }}
              placeholder={intl.formatMessage({id: 'assign.leads_form.form_item.staff.placeholder.select.single'})}
            >
              {users.map(user => (
                <Option value={`${user.get('id')}`} key={user.get('id')}>
                  {user.get('username')}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            loading={isAssigningLeads}
          >
            {intl.formatMessage({id: 'form.form_item.button.add.text'})}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(LeadAssignFormBox))
