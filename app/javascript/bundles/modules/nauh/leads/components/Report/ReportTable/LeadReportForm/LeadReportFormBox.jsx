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
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label={intl.formatMessage({id: 'report.leads_form.form_item.from.label'})}>
            <Input
              style={{ width: '300px' }}
              type="number"
              placeholder={intl.formatMessage({id: 'report.leads_form.form_item.from.placeholder.input'})}
            />
        </FormItem>
        <FormItem label={intl.formatMessage({id: 'report.leads_form.form_item.to.label'})}>
            <Input
                style={{ width: '300px' }}
                type="number"
                placeholder={intl.formatMessage({id: 'report.leads_form.form_item.to.placeholder.input'})}
            />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            loading={isReportingLeads}
          >
            {intl.formatMessage({id: 'form.form_item.button.filter.text'})}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(LeadReportFormBox))