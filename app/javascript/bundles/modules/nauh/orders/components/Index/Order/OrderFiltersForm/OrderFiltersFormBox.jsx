import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import {
  getFilterParamsAndSyncUrl, getFilterParams, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { NAUH_BASE_URL, ORDER_EXPORT_API_PATH } from '../../../../constants/paths'
import { selectFilterOption } from 'helpers/antdHelper'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import {getCredentials} from 'helpers/auth/authHelper'
import qs from 'qs'

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
      'handleExport',
    ])

    this.initialValues = this.getInitialValues()
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentOrderParams = Immutable.fromJS(getFilterParams(indexState.get('orderFilters'), location))

    return {
      created_at: getInitialValueForRangePicker({}, currentOrderParams, ['created_at.gte'], ['created_at.lt']),
      updated_at: getInitialValueForRangePicker({}, currentOrderParams, ['updated_at.gte'], ['updated_at.lt']),
      campaign_id: getInitialValue({}, currentOrderParams, ['campaign_id.in']),
      staff_id: getInitialValue({}, currentOrderParams, ['compconds', 'staff_id.in']),
      order_level_id: getInitialValue({}, currentOrderParams, ['compconds', 'order_level_id.in']),
      payment_method_ids: getInitialValue({}, currentOrderParams, ['payment_method_ids']),
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
    const inCompFields = ['campaign_id', 'order_level_id']
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

  handleExport() {
    const {actions, indexState, location} = this.props
    let orderParams = getFilterParams(indexState.get('orderFilters'), location)
    const query = qs.stringify({...orderParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${NAUH_BASE_URL}${ORDER_EXPORT_API_PATH}?=${query}`, '_blank')
  }

  render() {
    const {indexState, form, sharedState, intl} = this.props
    const isFetchingOrders = indexState.get('isFetchingOrders')
    const campaigns = sharedState.get('campaigns')
    const users = sharedState.get('users')
    const orderLevels = sharedState.get('orderLevels')
    const paymentMethods = sharedState.get('paymentMethods')
    const recordTotal = indexState.getIn(['orderFilters', 'paging', 'record_total'])
    const { getFieldDecorator } = form

    return (
      <div className="box box-with-border box-with-shadow">
        <div className="box-body">
          <Form onSubmit={this.handleFilter} >
            <Row gutter={40}>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.created_in.label'})}
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
                  label={intl.formatMessage({id: 'attrs.updated_in.label'})}
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
                  label={intl.formatMessage({id: 'attrs.campaign.label'})}
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
                      placeholder={intl.formatMessage(
                        {id: 'attrs.campaign.placeholder.select.single'}
                      )}
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
                  label={intl.formatMessage({id: 'attrs.staff.label'})}
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
                      placeholder={intl.formatMessage({id: 'attrs.staff.placeholder.select.all'})}
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
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.order_level_id.label'})}
                  {...FILTER_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('order_level_id', {
                    rules: [{ type: 'array' }],
                    ...this.initialValues.order_level_id,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      mode="multiple"
                      placeholder={intl.formatMessage({id: 'attrs.order_level_id.placeholder.select.all'})}
                      allowClear={true}
                    >
                      {orderLevels.toJS().map(orderLevel => (
                        <Option value={`${orderLevel.id}`} key={orderLevel.id}>
                          {orderLevel.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.payment_method.label'})}
                  {...FILTER_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('payment_method_ids', {
                    rules: [{ type: 'array' }],
                    ...this.initialValues.payment_method_ids,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      mode="multiple"
                      placeholder={intl.formatMessage({id: 'attrs.payment_method.placeholder.select.all'})}
                      allowClear={true}
                    >
                      {paymentMethods.toJS().map(paymentMethod => (
                        <Option value={`${paymentMethod.id}`} key={paymentMethod.id}>
                          {paymentMethod.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  className="button-margin--right--default"
                  onClick={this.handleExport}
                  disabled={isFetchingOrders}
                >
                  {intl.formatMessage(
                    {id: 'index.filters_form.form_item.button.export.text'},
                    {numOfItem: recordTotal || ''}
                  )}
                </Button>
                <Button className="button-margin--right--default" onClick={this.handleReset}>
                  {intl.formatMessage({id: 'form.form_item.button.clear.text'})}
                </Button>
                <Button type="primary" htmlType="submit" loading={isFetchingOrders}>
                  {intl.formatMessage({id: 'form.form_item.button.filter.text'})}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(injectIntl(OrderFiltersFormBox))