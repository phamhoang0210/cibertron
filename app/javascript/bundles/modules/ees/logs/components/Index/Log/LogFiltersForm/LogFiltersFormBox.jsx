import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Select, DatePicker, Button } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
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
const InputGroup = Input.Group
const dateFormat = 'YYYY/MM/DD'

class LogFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
    ])

  }

  handleFilter(e) {
    e.preventDefault()
    const {tabKey} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        if(tabKey=="logs"){
          let logParams = getFilterParams(indexState.get('logFilters'))
          actions.fetchLogs(mergeDeep([logParams, this.formatFormData(values)]))
        }else{
          let emailParams = getFilterParams(indexState.get('emailFilters'))
          actions.fetchEmails(mergeDeep([emailParams, this.formatFormData(values)]))
        }
      }
    })
  }
  handleExport() {

  }
  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['status', 'group_id', 'campaign_id']
    const timerangeFields = ['created_at']
    
    let compconds = {}
    inCompFields.forEach(field => {
      compconds[field] = {in: formatedValues[field]}
      delete formatedValues[field]
    })

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[field] = {}
      compconds[field]['gte'] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[field]['lt'] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
      delete formatedValues[field]
    })
    return mergeDeep([formatedValues, compconds])
  }

  render() {
    const {indexState, form, sharedState, tabKey} = this.props
    const isFetchingLogs = (tabKey=="emails") ? indexState.get('isFetchingEmailLogs') : indexState.get('isFetchingLogs')
    const logs = sharedState.get('logs')
    const totalPage = (tabKey=="emails") ? indexState.getIn(['emailFilters', 'paging', 'record_total']) : indexState.getIn(['logFilters', 'paging', 'record_total'])
    const { getFieldDecorator } = form
    const logstatuses = [{id: 1, name: "REQUESTED"},{id: 2, name: "SUCCESS"},{id: 3, name: "SEND FAILED"}]
    const groups = indexState.get('groups')
    const campaigns = indexState.get('campaigns')
    return (
      <div className="box box-with-shadow box-with-border">
        <Form
          className="box-body"
          onSubmit={this.handleFilter}
        >
          <Row gutter={40}>
            <Col span={8}>
              <FormItem
                label="Created in"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('created_at',{
                  initialValue: [moment((new Date().toISOString().split('T')[0])+' 00:00:00'), moment((new Date().toISOString().split('T')[0])+' 23:59:59')]
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
                label="Status"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('status', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder="-- All --"
                    allowClear={true}
                  >
                    {logstatuses && logstatuses.map(status => (
                      <Option key={status.id} value={status.name}>
                        {status.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                label="Group"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('group_id', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    disabled={(tabKey=="emails") ? true : false}
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder="-- All --"
                    allowClear={true}
                  >
                    {groups && groups.toJS().map(group => (
                      <Option key={group.id} value={group.id}>
                        {group.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            
          </Row>
          <Row gutter={40}>
            <Col span={8}>
              <FormItem
                label="Campaign"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('campaign_id', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    disabled={(tabKey=="emails") ? false : true}
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder="-- All --"
                    allowClear={true}
                  >
                    {campaigns && campaigns.toJS().map(campaign => (
                      <Option key={campaign.id} value={campaign.id}>
                        {campaign.name}
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
              disabled={isFetchingLogs}
            >
              {`Export (${totalPage})`}
            </Button>
              <Button type="primary" htmlType="submit" loading={isFetchingLogs}>
                Filter
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

export default Form.create()(injectIntl(LogFiltersFormBox))