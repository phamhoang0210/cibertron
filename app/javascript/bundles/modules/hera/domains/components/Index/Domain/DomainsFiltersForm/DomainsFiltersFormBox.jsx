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

class DomainsFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)
    let { actions } = this.props
    this.fetchAllUsers = _.debounce(actions.fetchAllUsers, 1000)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
      'handleSearch',
      'handleStatus'
    ])
    this.state = {'selectedStatus': null}
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let domainParams = getFilterParams(indexState.get('domainFilters'))
        actions.fetchDomains(mergeDeep([domainParams, this.formatFormData(values)]))
      }
    })
    this.state = {'selectedStatus': null}
  }

  handleSearch(keyword){
    const {actions} = this.props

    this.fetchAllUsers({ keyword:`${keyword}` })
  }
  
  handleExport() {

  }

  handleStatus(e) {
    const {actions} = this.props
    e.preventDefault()
    let a = this.state.selectedStatus != e.target.value ? e.target.value : ''

    this.setState({'selectedStatus': a})

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let domainParams = getFilterParams(indexState.get('domainFilters'))
        actions.fetchDomains(mergeDeep([domainParams, this.formatFormData(values), {status: a}]))
      }
    })
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['status', 'platform_id', 'user_id']
    const timerangeFields = ['created_at']
    
    let compconds = {}
    inCompFields.forEach(field => {
      compconds[`${field}.in`] = formatedValues[field]
      delete formatedValues[field]
    })

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[field] = {}
      compconds[`${field}.gte`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[`${field}.lt`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
      delete formatedValues[field]
    })
    return mergeDeep([formatedValues, {compconds}])
  }

  render() {
    const {indexState, form, sharedState, tabKey} = this.props
    const { getFieldDecorator } = form
    const totalPage = indexState.getIn(['domainFilters', 'paging', 'record_total'])
    const isFetchingDomains = indexState.get('isFetchingDomains')
    const domainDnsServers = sharedState.get('domainDnsServers')
    const users = sharedState.get('allusers')
    const dnsServer = sharedState && sharedState.get('allPlatforms')
    const active = indexState.getIn(['domainFilters', 'paging', 'active'])
    const pending = indexState.getIn(['domainFilters', 'paging', 'pending'])
    const deleted = indexState.getIn(['domainFilters', 'paging', 'deleted'])
    const error = indexState.getIn(['domainFilters', 'paging', 'error'])
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
                {getFieldDecorator('created_at', {initialValue: [moment((new Date().toISOString().split('T')[0])+' 00:00:00'), moment((new Date().toISOString().split('T')[0])+' 23:59:59')]})(
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
                label="Platform"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('platform_id', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder="-- All --"
                    allowClear={true}
                  >
                    {dnsServer && dnsServer.toJS().map(server => (
                      <Option value={`${server.id}`} key={server.id}>
                        {server.title}
                      </Option>
                    ))}
                    <Option value={null}>No platform</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                label="User"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('user_id', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    placeholder="Nhân viên"
                    allowClear={true}
                    onSearch={this.handleSearch}
                  >
                    {users.toJS().map(user => (
                      <Option value={`${user.id}`} key={user.id}>
                        {user.nickname}
                      </Option>
                    ))}
                    <Option value={null}>No user</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={24} style={{ textAlign: 'right'}}>
            <Button
              className="button-margin--right--default"
              value = 'ACTIVE'
              onClick={this.handleStatus}
              icon={this.state.selectedStatus == 'ACTIVE' ? "down-square" : ''}
            >
              {`ACTIVE (${active})`}
            </Button>
            <Button
              className="button-margin--right--default"
              value = 'PENDING'
              onClick={this.handleStatus}
              icon={this.state.selectedStatus == 'PENDING' ? "warning" : ''}
            >
              {`PENDING (${pending})`}
            </Button>

            <Button
              className="button-margin--right--default"
              value = 'DELETED'
              onClick={this.handleStatus}
              icon={this.state.selectedStatus == 'DELETED' ? "delete" : ''}
            >
              {`DELETED (${deleted})`}
            </Button>

            <Button
              className="button-margin--right--default"
              value = 'ERROR'
              onClick={this.handleStatus}
              icon={this.state.selectedStatus == 'ERROR' ? "close-square" : ''}
            >
              {`ERROR (${error})`}
            </Button>

              <Button type="primary" htmlType="submit" loading={isFetchingDomains} >
                Filter
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

export default Form.create()(injectIntl(DomainsFiltersFormBox))