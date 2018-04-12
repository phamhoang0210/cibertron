import React from 'react'
import _ from 'lodash'
import { Form, Input, Select, Button } from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option

class LeadReportFormBox extends React.Component {
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
        actions.reportLeads(values)
      }
    })
  }

  render() {
    const {actions, reportState, sharedState, intl} = this.props
    const users = sharedState.get('users')
    const isReportingLeads = reportState.get('isReportingLeads')
    const { getFieldDecorator } = this.props.form

    return (
      null
    )
  }
}

export default Form.create()(injectIntl(LeadReportFormBox))