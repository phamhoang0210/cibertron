import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'
import {
    getFilterParams, getFilterParamsAndSyncUrl, mergeDeep, getInitialValueForRangePicker,
    getInitialValue,
} from 'helpers/applicationHelper'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option

class LeadReportFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
    ])
  }

    handleFilter(e) {
    e.preventDefault()
    const {form, actions, reportState} = this.props
    form.validateFields((err, values) => {
      if (!err) {
          actions.fetchReport(mergeDeep([{}, this.formatFormData(values)]))
      }
    })
  }

    formatFormData(values) {
        let formatedValues = values
        const timerangeFields = ['date']
        let compconds = {}

        timerangeFields.forEach(field => {
            const timeRange = formatedValues[field] || []
            compconds[`${field}_from`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
            compconds[`${field}_to`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
            delete formatedValues[field]
        })

        return mergeDeep([formatedValues, compconds])
    }

  render() {
    const {actions, reportState, sharedState, intl} = this.props
    const users = sharedState.get('users')
    const isReportingLeads = reportState.get('isReportingLeads')
    const { getFieldDecorator } = this.props.form
    return (
        <Form layout="inline" onSubmit={this.handleFilter}>
            <FormItem
                label="Chọn ngày"
                {...FILTER_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('date')(
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