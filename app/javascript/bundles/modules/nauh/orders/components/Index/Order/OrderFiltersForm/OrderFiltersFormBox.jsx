import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class OrderFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
    ])
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState} = this.props
        let orderParams = getFilterParams(indexState.get('orderFilters'))

        actions.fetchOrders(mergeDeep([orderParams, this.formatFormData(values)]))
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
    const {indexState, form, sharedState} = this.props
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
            <FormItem label="Created in" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('created_at')(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Updated in" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('updated_at')(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Campaign" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('campaign_id', {
                rules: [{ type: 'array' }]
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  mode="multiple"
                  placeholder="-- All --"
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
            <FormItem label="Staff" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('staff_id', {
                rules: [{ type: 'array' }]
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  mode="multiple"
                  placeholder="-- All --"
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
            <Button type="primary" htmlType="submit" loading={isFetchingOrders}>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(OrderFiltersFormBox)