import React from 'react'
import _ from 'lodash'
import { Form, Input, Select, Button } from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'

const FormItem = Form.Item
const Option = Select.Option

class LeadAssignFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
  }

  handleSubmit(e) {
    e.preventDefault()
    const {form, actions} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        actions.assignLeads(values)
      }
    })
  }

  render() {
    const {actions, assignState, sharedState} = this.props
    const users = sharedState.get('users')
    const isAssigningLeads = assignState.get('isAssigningLeads')
    const { getFieldDecorator } = this.props.form

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Leads">
          {getFieldDecorator('numbers')(
            <Input
              style={{ width: '100px' }}
              type="number"
              placeholder="Number of lead.."
            />
          )}
        </FormItem>
        <FormItem label="Staff">
          {getFieldDecorator('staff_id', {
            rules: [{ required: true, message: 'Staff is required!' }],
          })(
            <Select
              showSearch
              filterOption={selectFilterOption}
              style={{ width: '200px' }} placeholder="Select staff.."
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
            Add
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(LeadAssignFormBox)