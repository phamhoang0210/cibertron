import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { NAUH_BASE_URL, LEAD_EXPORT_API_PATH } from '../../../../constants/paths'
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

class LeadFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
      'handleReset',
    ])

    this.initialValues = this.getInitialValues()
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentLeadFilters = Immutable.fromJS(getFilterParams(indexState.get('leadFilters'), location))
    return {
      created_at: getInitialValueForRangePicker({}, currentLeadFilters, ['created_at.gte'], ['created_at.lt']),
      imported_at: getInitialValueForRangePicker({}, currentLeadFilters, ['imported_at.gte'], ['imported_at.lt']),
      assigned_at: getInitialValueForRangePicker({}, currentLeadFilters, ['assigned_at.gte'], ['assigned_at.lt']),
      lead_level_id: getInitialValue({}, currentLeadFilters, ['lead_level_id.in']),
      staff_id: getInitialValue({}, currentLeadFilters, ['staff_id.in']),
      care_status_id: getInitialValue({}, currentLeadFilters, ['care_status_id.in']),
    }
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let leadParams = getFilterParamsAndSyncUrl(indexState.get('leadFilters'), location, this.formatFormData(values))
        actions.fetchLeads(leadParams)
      }
    })
  }

  handleReset() {
    this.props.form.resetFields()
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['lead_level_id', 'staff_id', 'care_status_id']
    const timerangeFields = ['created_at', 'imported_at', 'assigned_at']
    
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
    const {actions, indexState, location} = this.props
    let leadParams = getFilterParamsAndSyncUrl(indexState.get('leadFilters'), location)
    const query = qs.stringify({...leadParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${NAUH_BASE_URL}${LEAD_EXPORT_API_PATH}?=${query}`, '_blank')
  }

  render() {
    const {indexState, form, sharedState, location, intl} = this.props
    const isFetchingLeads = indexState.get('isFetchingLeads')
    const leadLevels = sharedState.get('leadLevels')
    const careStatuses = sharedState.get('careStatuses')
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
            <FormItem
              label={intl.formatMessage({id: 'index.filters.form_item.created_in.label'})}
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
              label={intl.formatMessage({id: 'index.filters.form_item.imported_in.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('imported_at', {
                ...this.initialValues.imported_at,
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
              label={intl.formatMessage({id: 'index.filters.form_item.assigned_in.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('assigned_at', {
                ...this.initialValues.assigned_at,
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
              label={intl.formatMessage({id: 'index.filters.form_item.lead_level_id.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('lead_level_id', {
                rules: [{ type: 'array' }],
                ...this.initialValues.lead_level_id,
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
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
            <FormItem 
              label={intl.formatMessage({id: 'index.filters.form_item.staff_id.label'})}
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
            <FormItem
              label={intl.formatMessage({id: 'index.filters.form_item.care_status_id.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('care_status_id', {
                rules: [{ type: 'array' }],
                ...this.initialValues.care_status_id,
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  mode="multiple"
                  placeholder="-- All --"
                  allowClear={true}
                >
                  {careStatuses.toJS().map(status => (
                    <Option value={`${status.id}`} key={status.id}>
                      {status.code}
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
              disabled={isFetchingLeads}
            >
              {intl.formatMessage(
                {id: 'index.filters.form_item.button.export.text'},
                {numOfItem: totalPage || ''}
              )}
            </Button>
            <Button
              className="button-margin--right--default"
              onClick={this.handleReset}
            >
              {intl.formatMessage({id: 'index.filters.form_item.button.clear.text'})}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingLeads}>
              {intl.formatMessage({id: 'index.filters.form_item.button.filter.text'})}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(LeadFiltersFormBox))