import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { IZZY_BASE_URL } from '../../../../constants/paths'
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

class TemplateFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleExport',
    ])
    this.initialValues = this.getInitialValues()
  }
  getInitialValues() {
    const {indexState, location} = this.props
    const currentListFilters = Immutable.fromJS(getFilterParams(indexState.get('listFilters'), location))
    return {
      imported_at: getInitialValueForRangePicker({}, currentListFilters, ['imported_at.gte'], ['imported_at.lt']),
      updated_at: getInitialValueForRangePicker({}, currentListFilters, ['assigned_at.gte'], ['assigned_at.lt']),
      staff_id: getInitialValue({}, currentListFilters, ['compconds', 'staff_id.in']),
    }
  }
  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location, this.formatFormData(values))
        
        actions.fetchLists(listParams)
      }
    })
  }
  formatFormData(values) {
    let formatedValues = values
    const inCompFields = ['user_id']
    const timerangeFields = ['created_at']
    
    let compconds = {}
    inCompFields.forEach(field => {
      compconds[`${field}.in`] = formatedValues["staff_id"]
      delete formatedValues["staff_id"]
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
    let listParams = getFilterParams(indexState.get('listFilters'), location)
    const query = qs.stringify({...listParams, ...getCredentials()}, { arrayFormat: 'brackets' }) 
    window.open(`${A3_STORAGE_BASE_URL}${CONTACTA3S_EXPORT_API_PATH}?=${query}`, '_blank')
  }
  render() {
    const {indexState, form, sharedState,location, intl} = this.props
    const isFetchingLists = indexState.get('isFetchingLists')
    const contacta3Statuses = sharedState.get('contacta3Statuses')
    const users = sharedState.get('allusers')
    const lists = sharedState.get('lists')
    const totalPage = indexState.getIn(['listFilters', 'paging', 'record_total'])
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
              label="Created at"
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
            
          </Row>
          <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              className="button-margin--right--default"
              onClick={this.handleExport}
              disabled={isFetchingLists}
            >
              {`Export (${totalPage})`}
            </Button>
            <Button type="primary" htmlType="submit" loading={isFetchingLists}>
              Filter
            </Button>
          </Col>
        </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(injectIntl(TemplateFiltersFormBox))