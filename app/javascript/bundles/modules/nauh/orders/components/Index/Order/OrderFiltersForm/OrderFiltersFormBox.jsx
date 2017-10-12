import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import {
  getFilterParamsAndSyncUrl, getFilterParams, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class OrderFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleReset',
    ])

    this.initialValues = this.getInitialValues()
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentOrderParams = Immutable.fromJS(getFilterParams(indexState.get('orderFilters'), location))

    return {
      created_at: getInitialValueForRangePicker({}, currentOrderParams, ['created_at.gte'], ['created_at.lt']),
      updated_at: getInitialValueForRangePicker({}, currentOrderParams, ['updated_at.gte'], ['updated_at.lt']),
      campaign_id: getInitialValue({}, currentOrderParams, 'campaign_id'),
      staff_id: getInitialValue({}, currentOrderParams, 'staff_id'),
    }
  }

  handleReset() {
    this.props.form.resetFields()
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let orderParams = getFilterParamsAndSyncUrl(indexState.get('orderFilters'), location, this.formatFormData(values))

        actions.fetchOrders(orderParams)
      }
    })
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['campaign_id']
    const timerangeFields = ['created_at', 'updated_at']

    let compconds = {}
    inCompFields.forEach(field => {
      compconds[`${field}.in`] = formatedValues[field]
      delete formatedValues[field]
    })

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[`${field}.gte`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[`${field}.lt`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
      delete formatedValues[field]
    })

    if(formatedValues['staff_id']) {
      compconds['lead'] = {'staff_id.in': formatedValues['staff_id']}
      delete formatedValues['staff_id']
    }

    return mergeDeep([formatedValues, {compconds: compconds}])
  }

  render() {
    const {indexState, form, sharedState, intl} = this.props
    const isFetchingOrders = indexState.get('isFetchingOrders')
    const campaigns = sharedState.get('campaigns')
    const users = sharedState.get('users')
    const { getFieldDecorator } = form

    return (
      <Form
        className="box box-with-boder"
        onSubmit={this.handleFilter}
      >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem
              label={intl.formatMessage({id: 'form.form_item.created_in.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('created_at', {
                ...this.initialValues.created_at,
              })(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.formatMessage({id: 'form.form_item.updated_in.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('updated_at', {
                ...this.initialValues.updated_at,
              })(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.formatMessage({id: 'form.form_item.campaign_id.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('campaign_id', {
                rules: [{ type: 'array' }],
                ...this.initialValues.campaign_id,
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  mode="multiple"
                  placeholder={intl.formatMessage({id: 'form.form_item.campaign_id.placeholder'})}
                  allowClear={true}
                >
                  {campaigns.toJS().map(campaign => (
                    <Option value={`${campaign.id}`} key={campaign.id}>
                      {campaign.code}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.formatMessage({id: 'form.form_item.staff_id.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('staff_id', {
                rules: [{ type: 'array' }],
                ...this.initialValues.staff_id,
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  mode="multiple"
                  placeholder={intl.formatMessage({id: 'form.form_item.staff_id.placeholder'})}
                  allowClear={true}
                >
                  {users.toJS().map(user => (
                    <Option value={`${user.id}`} key={user.id}>
                      {user.username}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button className="button-margin--right--default" onClick={this.handleReset}>
              {intl.formatMessage({id: 'form.form_item.button.clear.text'})}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingOrders}>
              {intl.formatMessage({id: 'form.form_item.button.filter.text'})}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(OrderFiltersFormBox))