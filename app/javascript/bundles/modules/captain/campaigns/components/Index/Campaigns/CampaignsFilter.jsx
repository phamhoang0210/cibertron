import React from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import Immutable from 'immutable'
import { injectIntl } from 'react-intl'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import {Form, Row, Col, Select, DatePicker, Button} from 'antd'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { MYSQL_DATE_FORMAT, MYSQL_DATETIME_FORMAT } from 'app/constants/datatime'
import { getFilterParamsAndSyncUrl, getInitial, mergeDeep, getFilterParams,} from 'helpers/applicationHelper'

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
      name: getInitial({}, currentCampaignsFilters, ['compconds','name']),
      creator: getInitial({}, currentCampaignsFilters, ['compconds','creator'])
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
    const inCompFields = ['name', 'creator', 'display', 'status','campaign_courses']
    const inCompCreatedAtFields = ['created_at']
    const inCompStartTimeFields = ['start_time']
    const inCompEndTimeFields = ['end_time']
    let compconds = {}
    inCompFields.forEach(field => {
      compconds[`${field}.eq`] = formatedValues[field]
      delete formatedValues[field]
    })
    inCompCreatedAtFields.forEach(field => {
      compconds[`${field}.gte`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT)
      compconds[`${field}.lt`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT) + 1
      delete formatedValues[field]
    })
    inCompStartTimeFields.forEach(field => {
      compconds[`${field}.gte`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT)
      compconds[`${field}.lt`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT) + 1
      delete formatedValues[field]
    })
    inCompEndTimeFields.forEach(field => {
      compconds[`${field}.gte`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT)
      compconds[`${field}.lt`] = (formatedValues[field]==undefined || formatedValues[field] == null) ? undefined : formatedValues[field].format(MYSQL_DATE_FORMAT) + 1
      delete formatedValues[field]
    })
    return mergeDeep([formatedValues, {compconds: compconds}])
  }

  handleAdd(e) {
    browserHistory.push(`${CAMPAIGNS_URL}/new`)
  }

  handleReset() {
    this.props.form.resetFields()
  }

  render() {
    const {intl,sharedState,form, indexState} = this.props
    const type = sharedState.toJS().type
    const status = sharedState.toJS().status
    const { getFieldDecorator } = form
    const isFetchingCampaigns = indexState.isFetchingCampaigns
    let campaigns = sharedState.toJS().campaigns
    let users = sharedState.toJS().users
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
                { getFieldDecorator('name', {
                  ...this.initialValues.name,
                })(
                  <Select
                  filterOption={selectFilterOption}
                    allowClear={true}
                    showArrow = {false}
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder={intl.formatMessage({id: 'index.campaigns.placeholder.select.none'})}  >
                    { campaigns.map((item, index) => (
                      <Option value = {item.name} key = {index}>{item.name}</Option>
                    ))}
                  </Select>
                 )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.create_date.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('created_at')(
                   <DatePicker
                    style={{width: '100%'}} 
                    placeholder={intl.formatMessage({id: 'index.create_date.placeholder.select.none'})}
                  />
                )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.user.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('creator',{
                  ...this.initialValues.creator
                })(
                  <Select
                    allowClear={true}
                    showArrow = {false}
                    placeholder={intl.formatMessage({id: 'index.user.placeholder.select.none'})} >
                    { users.map((item, index) => (
                        <Option value = {item.creator} key = {index}>{item.creator}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.type.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('display',{
                  ...this.initialValues.display
                })(
                  <Select 
                    allowClear={true}
                    showArrow = {false}
                    placeholder={intl.formatMessage({id: 'index.type.placeholder.select.none'})}
                  >
                    { type.map(item => (
                        <Option value = {item.value} key={item.id} >{item.title}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.time_start.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                 { getFieldDecorator('start_time')(
                   <DatePicker  
                      style={{width: '100%'}} 
                      placeholder={intl.formatMessage({id: 'index.time_start.placeholder.select.none'})} />
                 )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.time_over.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('end_time')(
                  <DatePicker  
                    style={{width: '100%'}} 
                    placeholder={intl.formatMessage({id: 'index.time_over.placeholder.select.none'})} />
                )}

              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.status.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('status',{
                  ...this.initialValues.status
                })(
                  <Select 
                    allowClear={true}
                    showArrow = {false}
                    placeholder={intl.formatMessage({id: 'index.status.placeholder.select.none'})} >
                    { status.map(item => (
                        <Option value = {item.value} key={item.id} >{item.title}</Option>
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