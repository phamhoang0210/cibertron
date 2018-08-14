import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { LEAD_EXPORT_API_PATH } from '../../../../constants/paths'
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
      imported_at: getInitialValueForRangePicker({}, currentLeadFilters, ['c'], ['imported_at.lt']),
      assigned_at: getInitialValueForRangePicker({}, currentLeadFilters, ['assigned_at.gte'], ['assigned_at.lt']),
      care_date: getInitialValueForRangePicker({}, currentLeadFilters, ['care_date.gte'], ['care_date.lt']),
      report_date: getInitialValueForRangePicker({}, currentLeadFilters, ['report_date.gte'], ['report_date.lt']),
      lead_level_id: getInitialValue({}, currentLeadFilters, ['compconds', 'lead_level_id.in']),
      staff_id: getInitialValue({}, currentLeadFilters, ['compconds', 'staff_id.in']),
      lead_status_id: getInitialValue({}, currentLeadFilters, ['compconds', 'lead_status_id.in']),
      other_filters: getInitialValue({}, currentLeadFilters, ['other_filters']),
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
    const inCompFields = ['lead_level_id', 'staff_id']
    const timerangeFields = ['imported_at', 'assigned_at', 'care_date', 'report_date']
    const lead_status_code = formatedValues['lead_status_code']
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

    return mergeDeep([formatedValues, {compconds: compconds}, {lead_status_code_filters: lead_status_code}])
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
    const leadStatuses = sharedState.get('leadStatuses')
    const otherFilters = sharedState.get('otherFilters')
    const calls = sharedState.get('calls')
    const report = sharedState.get('report')
    const source = sharedState.get('source')
    const users = sharedState.get('users')
    const recordTotal = indexState.getIn(['leadFilters', 'paging', 'record_total'])
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
                label={intl.formatMessage({id: 'attrs.imported_in.label'})}
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
                label={intl.formatMessage({id: 'attrs.assigned_in.label'})}
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
                label={intl.formatMessage({id: 'attrs.lead_level_id.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('lead_level_id')(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder={intl.formatMessage({id: 'attrs.lead_level_id.placeholder.select.all'})}
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
                label={intl.formatMessage({id: 'attrs.staff_id.label'})}
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
                    placeholder={intl.formatMessage({id: 'attrs.staff_id.placeholder.select.all'})}
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
                label={intl.formatMessage({id: 'attrs.lead_status_id.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('lead_status_code', {
                  rules: [{ type: 'array' }],
                  ...this.initialValues.lead_status_id,
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder={intl.formatMessage({id: 'attrs.lead_status_id.placeholder.select.all'})}
                    allowClear={true}
                  >
                    {leadStatuses.toJS().map(status => (
                      <Option value={`${status.code}`} key={status.id}>
                        {status.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={intl.formatMessage({id: 'attrs.other_filters.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('other_filters', {
                  rules: [{ type: 'array' }],
                  ...this.initialValues.other_filters,
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder={intl.formatMessage({id: 'attrs.other_filters.placeholder.select.none'})}
                    allowClear={true}
                  >
                    {otherFilters.toJS().map(otherFilter => (
                      <Option value={`${otherFilter.value}`} key={otherFilter.value}>
                        {otherFilter.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
              <Col span={8}>
                  <FormItem
                      label={intl.formatMessage({id: 'attrs.calls.label'})}
                      {...FILTER_FORM_ITEM_LAYOUT}
                  >
                      {getFieldDecorator('calls', {
                          rules: [{ type: 'array' }],
                          ...this.initialValues.calls,
                      })(
                          <Select
                              showSearch
                              filterOption={selectFilterOption}
                              mode="multiple"
                              placeholder={intl.formatMessage({id: 'attrs.calls.placeholder.select.none'})}
                              allowClear={true}
                          >
                              {calls.toJS().map(calls => (
                                  <Option value={`${calls.value}`} key={calls.value}>
                                      {calls.title}
                                  </Option>
                              ))}
                          </Select>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem
                      label={intl.formatMessage({id: 'attrs.report.label'})}
                      {...FILTER_FORM_ITEM_LAYOUT}
                  >
                      {getFieldDecorator('report', {
                          rules: [{ type: 'array' }],
                          ...this.initialValues.report,
                      })(
                          <Select
                              showSearch
                              filterOption={selectFilterOption}
                              mode="multiple"
                              placeholder={intl.formatMessage({id: 'attrs.report.placeholder.select.none'})}
                              allowClear={true}
                          >
                              {report.toJS().map(report => (
                                  <Option value={`${report.value}`} key={report.value}>
                                      {report.title}
                                  </Option>
                              ))}
                          </Select>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  {this.renderDateFilter()}
              </Col>
              <Col span={8}>
                  <FormItem
                      label={intl.formatMessage({id: 'attrs.source_contact.label'})}
                      {...FILTER_FORM_ITEM_LAYOUT}
                  >
                      {getFieldDecorator('source', {
                          rules: [{ type: 'array' }],
                          ...this.initialValues.source,
                      })(
                          <Select
                              showSearch
                              filterOption={selectFilterOption}
                              mode="multiple"
                              placeholder={intl.formatMessage({id: 'attrs.source_contact.placeholder.select.none'})}
                              allowClear={true}
                          >
                              {source.toJS().map(source => (
                                  <Option value={`${source.value}`} key={source.value}>
                                      {source.title}
                                  </Option>
                              ))}
                          </Select>
                      )}
                  </FormItem>
              </Col>
              <Col span={10}>
                  <FormItem
                      label={intl.formatMessage({id: 'attrs.care_date.label'})}
                      {...FILTER_FORM_ITEM_LAYOUT}
                  >
                      {getFieldDecorator('care_date', {
                          ...this.initialValues.care_date,
                      })(
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
                disabled={isFetchingLeads}
              >
                {intl.formatMessage(
                  {id: 'index.filters_form.form_item.button.export.text'},
                  {numOfItem: recordTotal || ''}
                )}
              </Button>
              <Button
                className="button-margin--right--default"
                onClick={this.handleReset}
              >
                {intl.formatMessage({id: 'form.form_item.button.clear.text'})}
              </Button>
              <Button type="primary" htmlType="submit" loading={isFetchingLeads}>
                {intl.formatMessage({id: 'form.form_item.button.filter.text'})}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
    renderDateFilter()
    {
        const {indexState, sharedState, form, intl} = this.props
        const { getFieldDecorator, getFieldValue } = form
        const report = getFieldValue('report')
        if(typeof report !== 'undefined' && report.length > 0) {
            return(
                <div>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.report_date.label'})}
                        {...FILTER_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('report_date', {
                            ...this.initialValues.report_date,
                        })(
                            <RangePicker
                                style={{width: '100%'}}
                                format={LONG_DATETIME_FORMAT}
                                showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                            />
                        )}
                    </FormItem>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default Form.create()(injectIntl(LeadFiltersFormBox))
