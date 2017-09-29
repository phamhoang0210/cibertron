import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT } from 'app/constants/config'
import { NAUH_BASE_URL, LEAD_EXPORT_API_PATH } from '../../../../constants/paths'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class LeadFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    }

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
    ])
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState} = this.props
        let leadParams = getFilterParams(indexState.get('leadFilters'))
        actions.fetchLeads(mergeDeep([leadParams, this.formatFormData(values)]))
      }
    })
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['lead_level_id', 'staff_id', 'care_status']
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
    
    return mergeDeep([formatedValues, {compconds: compconds}])
  }

  handleExport() {
    const {actions, indexState} = this.props
    let leadParams = getFilterParams(indexState.get('leadFilters'))
    const query = qs.stringify({...leadParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${NAUH_BASE_URL}${LEAD_EXPORT_API_PATH}?=${query}`, '_blank')
  }

  render() {
    const {indexState, form, sharedState} = this.props
    const isFetchingLeads = indexState.get('isFetchingLeads')
    const leadLevels = sharedState.get('leadLevels')
    const users = sharedState.get('users')
    const totalPage = indexState.getIn(['leadFilters', 'paging', 'record_total'])
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
                  style={{width: '100%'}}
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
            <FormItem label="Updated in" {...this.formItemLayout}>
              {getFieldDecorator('updated_at')(
                <RangePicker
                  style={{width: '100%'}}
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
            <FormItem label="Level" {...this.formItemLayout}>
              {getFieldDecorator('lead_level_id', {
                rules: [{ type: 'array' }]
              })(
                <Select
                  mode="multiple"
                  placeholder="-- All --"
                  allowClear={true}
                >
                  {leadLevels.toJS().map(leadLevel => (
                    <Option value={`${leadLevel.id}`} key={leadLevel.id}>
                      {leadLevel.name}
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
          <Col span={8}>
            <FormItem label="Status" {...this.formItemLayout}>
              {getFieldDecorator('care_status', {
                rules: [{ type: 'array' }]
              })(
                <Select
                  mode="multiple"
                  placeholder="-- All --"
                  allowClear={true}
                >
                  <Option value="default">default</Option>
                  <Option value="processing">processing</Option>
                  <Option value="done">done</Option>
                  <Option value="cancelled">cancelled</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button style={{marginRight: 4}} onClick={this.handleExport} disabled={isFetchingLeads}>
              {`Export (${totalPage || '..'})`}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingLeads}>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(LeadFiltersFormBox)