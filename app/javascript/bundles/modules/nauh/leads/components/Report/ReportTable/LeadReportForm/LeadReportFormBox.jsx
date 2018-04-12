import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const RangePicker = DatePicker.RangePicker
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
            <FormItem
                label="Chọn ngày"
                {...FILTER_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('fillter')(
                    <RangePicker
                        style={{width: '100%'}}
                        format={LONG_DATETIME_FORMAT}
                        showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                    />
                )}
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