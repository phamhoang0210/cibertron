import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { IZZY_BASE_URL } from '../../../../constants/paths'
import {
  getFilterParams, getFilterParamsAndSyncUrl, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class SenderFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
    ])
    this.initialValues = this.getInitialValues()
  }
  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let senderParams = getFilterParamsAndSyncUrl(indexState.get('senderFilters'), location, this.formatFormData(values))
        
        actions.fetchSenders(senderParams)
      }
    })
  }
  getInitialValues() {
    const {indexState, location} = this.props
    const currentSenderFilters = Immutable.fromJS(getFilterParams(indexState.get('senderFilters'), location))
    return {
      created_at: getInitialValueForRangePicker({}, currentSenderFilters, ['created_at.gte'], ['created_at.lt']),
    }
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = []
    const timerangeFields = ['created_at']
    
    let compconds = {}
    inCompFields.forEach(field => {
      compconds[field] = {in: formatedValues[field]}
      delete formatedValues[field]
    })

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[`${field}.gte`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[`${field}.lt`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
      delete formatedValues[field]
    })


    return mergeDeep([formatedValues, {compconds: compconds}])
  }
  handleExport() {
    const {actions, indexState, location} = this.props
    let senderParams = getFilterParams(indexState.get('senderFilters'), location)
    const query = qs.stringify({...senderParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${A3_STORAGE_BASE_URL}${CONTACTA3S_EXPORT_API_PATH}?=${query}`, '_blank')
  }

  render() {
    const {indexState, form, sharedState} = this.props
    const isFetchingSenders = indexState.get('isFetchingSenders')
    const contacta3Statuses = sharedState.get('contacta3Statuses')
    const senders = sharedState.get('senders')
    const totalPage = indexState.getIn(['senderFilters', 'paging', 'record_total'])
    const { getFieldDecorator } = form

    return (
      <div className="box box-with-shadow box-with-border">
        <Form
          className="box-body"
          onSubmit={this.handleFilter}
        >
          <Row gutter={40}>
            <Col span={8}>
            <FormItem
              label="Created at"
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('created_at')(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
            
          </Row>
          <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              className="button-margin--right--default"
              onClick={this.handleExport}
              disabled={isFetchingSenders}
            >
              {`Export (${totalPage})`}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingSenders}>
              Filter
            </Button>
          </Col>
        </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(injectIntl(SenderFiltersFormBox))