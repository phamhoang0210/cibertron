import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker, Cascader } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { selectFilterOption } from 'helpers/antdHelper'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class LandingpageFiltersFormBox extends React.Component {
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
        let landingpageParams = getFilterParams(indexState.get('landingpageFilters'))
        actions.fetchLandingpages(mergeDeep([landingpageParams, this.formatFormData(values)]))
      }
    })
  }

  getProductCascaderOptions() {
    const {sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('source_id')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('code')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
      })
    ))

    return [
      {
        value: 'course',
        label: 'Course',
        children: courses.toJS(),
      },
      {
        value: 'combo',
        label: 'Combo',
        children: combos.toJS(),
      },
    ]
  }

  formatFormData(values) {
    let formatedValues = values
    const timerangeFields = ['created_in', 'updated_in']
    
    let compconds = {}

    timerangeFields.forEach(field => {
      const timeRange = formatedValues[field] || []
      compconds[`${field}.gte`] = timeRange[0] && timeRange[0].format(MYSQL_DATETIME_FORMAT)
      compconds[`${field}.lt`] = timeRange[1] && timeRange[1].format(MYSQL_DATETIME_FORMAT)
      delete formatedValues[field]
    })
    
    return mergeDeep([formatedValues, {compconds: compconds}])
  }

  render() {
    const {indexState, form, sharedState} = this.props
    const isFetchingLandingpages = indexState.get('isFetchingLandingpages')
    const totalPage = indexState.getIn(['landingpageFilters', 'paging', 'record_total'])
    const productCascaderOptions = this.getProductCascaderOptions()
    const { getFieldDecorator } = form

    return (
      <Form
        className="box box-with-boder"
        onSubmit={this.handleFilter}
      >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem label="Created in" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('created_in')(
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
              {getFieldDecorator('updated_in')(
                <RangePicker
                  style={{width: '100%'}}
                  format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Courses" {...FILTER_FORM_ITEM_LAYOUT}>
              {getFieldDecorator('course_ids', {
                rules: [{ type: 'array' }]
              })(
                <Cascader
                  options={productCascaderOptions}
                  placeholder="Please select course"
                  showSearch
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" loading={isFetchingLandingpages}>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(LandingpageFiltersFormBox)