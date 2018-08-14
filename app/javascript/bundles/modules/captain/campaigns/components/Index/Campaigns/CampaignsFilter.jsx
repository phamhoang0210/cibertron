import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import Immutable from 'immutable'
import { injectIntl } from 'react-intl'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import {Form, Row, Col, Select, DatePicker, Button} from 'antd'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import {
  getFilterParams, getFilterParamsAndSyncUrl, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'

const FormItem = Form.Item;
const Option = Select.Option
class CampaignsFilter extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleFilter',
      'formatFormData',
      'handleAdd',
      'handleReset',
    ])
    this.initialValues = this.getInitialValues()
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentCampaignsFilters = Immutable.fromJS(getFilterParams(indexState.get('campaignsFilters'), location))
    return {
      campaign: getInitialValue({}, currentCampaignsFilters, ['compconds', 'campaign']),
      created_at: getInitialValue({}, currentCampaignsFilters, ['compconds', 'created_at']),

    }
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {actions, indexState, location} = this.props
        let campaignsParams = getFilterParamsAndSyncUrl(indexState.get('campaignsFilters'), location, this.formatFormData(values))
        actions.fetchCampaigns(campaignsParams)
      }
    })
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

  handleAdd(e) {
    browserHistory.push(`${CAMPAIGNS_URL}/new`)
  }

  handleReset() {
    this.props.form.resetFields()
  }

  render() {
    const {intl,sharedState,form, indexState, location} = this.props
    const list_campaign = sharedState['campaigns']
    const users = sharedState['users']
    const type = sharedState['type']
    const status = sharedState['status']
    const { getFieldDecorator } = form
    const isFetchingCampaigns = indexState.isFetchingCampaigns
    const data = indexState.toJS().campaign
    console.log('data',this.props.indexState.toJS())
    return (
      <div className="box box-with-shadow box-with-border">
        <Form className="box-body"
          onSubmit={this.handleFilter}
        >
          <Row gutter={40}>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.campaigns.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}
                >
                { getFieldDecorator('campaign',{
                  ...this.initialValues.campaign
                })(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.campaigns.placeholder.select.none'})}  >
                    { data.map(item => (
                        <Option value = {item.id} key = {item.id}>{item.name}</Option>
                    ))}
                  </Select>
                 )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.create_date.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('created_at',{
                  ...this.initialValues.created_at
                })(
                   <DatePicker
                    style={{width: '100%'}} 
                    placeholder={intl.formatMessage({id: 'index.create_date.placeholder.select.none'})}
                    format= {LONG_DATETIME_FORMAT}
                    showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                  />
                )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.user.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('users',{
                  ...this.initialValues.users
                })(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.user.placeholder.select.none'})} >
                    { data.map(item => (
                        <Option value = {item.creator} key = {item.id}>{item.creator}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.type.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('type',{
                  ...this.initialValues.type
                })(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.type.placeholder.select.none'})}
                  >
                    { type.map(item => (
                        <Option value = {item.title} key={item.id} >{item.title}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.time_start.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                 { getFieldDecorator('time_start',{
                  ...this.initialValues.time_start
                }
                 )(
                   <DatePicker  
                      style={{width: '100%'}} 
                      format= {LONG_DATETIME_FORMAT}
                      showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                      placeholder={intl.formatMessage({id: 'index.time_start.placeholder.select.none'})} />
                 )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.time_over.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('time_over',{
                  ...this.initialValues.time_over
                })(
                  <DatePicker  style={{width: '100%'}} 
                    format= {LONG_DATETIME_FORMAT}
                    showTime={TIME_PICKER_DEFAULT_SHOW_TIME}
                    placeholder={intl.formatMessage({id: 'index.time_over.placeholder.select.none'})} />
                )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.status.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('status')(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.status.placeholder.select.none'})} >
                    { status.map(item => (
                        <Option value = {item.title} key={item.id} >{item.title}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>

                <Button onClick = { this.handleAdd } style={{marginRight:10}} >Tạo chiến dịch mới</Button>
                <Button type htmlType="submit" loading={isFetchingCampaigns}  style={{marginRight:10}} type="primary">Lọc</Button>
                <Button onClick ={ this.handleReset }>Clear</Button>
              </Col>
            </Row>
        </Form>
      </div>
    );
  }

}
export default Form.create()(injectIntl(CampaignsFilter))