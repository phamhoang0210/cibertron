import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { A3_STORAGE_BASE_URL, CONTACTA3S_EXPORT_API_PATH } from '../../../../constants/paths'
import {
  getFilterParams, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { selectFilterOption } from 'helpers/antdHelper'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const InputGroup = Input.Group

class SourceFiltersFormBox extends React.Component {
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let sourceParams = getFilterParams(indexState.get('sourceFilters'))
        actions.fetchSources(mergeDeep([sourceParams, this.formatFormData(values)]))
      }
    })
  }

  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['status']
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

  handleExport() {
    const {actions, indexState, location} = this.props
    let sourceParams = getFilterParams(indexState.get('sourceFilters'), location)
    const query = qs.stringify({...sourceParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${A3_STORAGE_BASE_URL}${CONTACTA3S_EXPORT_API_PATH}?=${query}`, '_blank')
  }

  render() {
    const {indexState, form, sharedState} = this.props
    const isFetchingSources = indexState.get('isFetchingSources')
    const contacta3Statuses = sharedState.get('contacta3Statuses')
    const sources = sharedState.get('sources')
    const totalPage = indexState.getIn(['sourceFilters', 'paging', 'record_total'])
    const { getFieldDecorator } = form

    return (
      <Form
        className="box box-with-boder"
        onSubmit={this.handleFilter}
      >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem
              label="Created in"
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
                  {contacta3Statuses.toJS().map(status => (
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
              label="L8"
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              <InputGroup compact style={{ paddingTop: '3px' }}>
                {getFieldDecorator('min_l8_count')(
                  <Input
                    style={{ width: '40%', textAlign: 'center' }}
                    placeholder="Min"
                  />
                )}
                <Input
                  style={{ width: '20%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                  placeholder="~"
                  disabled
                />
                {getFieldDecorator('max_l8_count')(
                  <Input
                    style={{ width: '40%', textAlign: 'center', borderLeft: 0 }}
                    placeholder="Max"
                  />
                )}
              </InputGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              className="button-margin--right--default"
              onClick={this.handleExport}
              disabled={isFetchingSources}
            >
              {`Export (${totalPage})`}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingSources}>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SourceFiltersFormBox)