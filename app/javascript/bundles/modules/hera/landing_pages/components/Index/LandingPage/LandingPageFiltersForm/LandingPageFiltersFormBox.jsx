import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'


const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class LandingPageFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)
    let { actions } = this.props

    this.fetchUsers = _.debounce(actions.fetchUsers, 1000)
    this.fetchDiscounts = _.debounce(actions.fetchDiscounts, 1000)

    _.bindAll(this, [
      'handleFilter',
      'formatFormData'
    ])
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState} = this.props
        let landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
        actions.fetchLandingPages(mergeDeep([landingPageParams, this.formatFormData(values)]))
      }
    })
  }

  formatFormData(values) {
    let formatedValues = values

    const inCompFields = ['discount_id', 'user_id']
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

    return mergeDeep([formatedValues, {compconds}])
  }

  handleSearch(type, keyword){
    switch (type){
      case "user":
        this.fetchUsers({compconds: { "username.like": `%${keyword}%` }});
        break;
      case "discount":
        this.fetchDiscounts({
          fields: 'product_json',
          compconds: { "name.like": `%${keyword}%` },
          per_page: 20
        })
        break;
      default:
        return null
    }
  }

  render() {
    const {indexState, form, sharedState, intl} = this.props
    const discounts = sharedState.get('discounts')
    const users = sharedState.get('users')
    const isFetchingLandingPages = indexState.get('isFetchingLandingPages')
    const totalPage = indexState.getIn(['landingPageFilters', 'paging', 'record_total'])
    const { getFieldDecorator } = form
    return (
      <Form
        className="box box-with-boder"
        onSubmit={this.handleFilter}
      >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.created_in.label'})}
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
              label={intl.formatMessage({id: 'attrs.updated_in.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
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
            <FormItem
              label={intl.formatMessage({id: 'attrs.discount_id.label'})}
              {...FILTER_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('discount_id')(
                <Select
                  allowClear
                  showSearch
                  mode="multiple"
                  placeholder={intl.formatMessage({id: 'attrs.discount_id.placeholder.select.all'})}
                  filterOption={selectFilterOption}
                  onSearch={this.handleSearch.bind(this, "discount")}
                >
                  {discounts.toJS().map(discount => (
                    <Option value={`${discount.id}`} key={discount.id}>
                      {discount.name}
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
                label="User"
                {...FILTER_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('user_gid', {
                  rules: [{ type: 'array' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    mode="multiple"
                    allowClear={true}
                    onSearch={this.handleSearch.bind(this, "user")}
                  >
                    {users.toJS().map(user => (
                      <Option value={`${user.gid}`} key={user.gid}>
                        {user.username}
                      </Option>
                    ))}
                    <Option value={null}>No user</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isFetchingLandingPages}
              >
                {intl.formatMessage({id: 'form.form_item.button.filter.text'})}
              </Button>
            </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(LandingPageFiltersFormBox))