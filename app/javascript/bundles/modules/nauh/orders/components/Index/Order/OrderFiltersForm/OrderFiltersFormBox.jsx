import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT } from 'app/constants/config'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class OrderFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }

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
    const timerangeFields = ['created_at']

    let compconds = {}
    inCompFields.forEach(field => {
      compconds[`${field}.in`] = formatedValues[field]
      delete formatedValues[field]
    })

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[`${field}.gte]`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[`${field}.lt]`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
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
            <FormItem label="Created in" {...this.formItemLayout}>
              {getFieldDecorator('created_at')(
                <RangePicker
                  format={LONG_DATETIME_FORMAT}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Campaign" {...this.formItemLayout}>
              {getFieldDecorator('campaign_id', {
                rules: [{ type: 'array' }]
              })(
                <Select
                  mode="multiple"
                  placeholder="-- All --"
                  allowClear={true}
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
            <FormItem label="Staff" {...this.formItemLayout}>
              {getFieldDecorator('staff_id', {
                rules: [{ type: 'array' }]
              })(
                <Select
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