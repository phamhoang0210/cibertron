import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { injectIntl } from 'react-intl'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import {Form, Row, Col, Select, RangePicker, DatePicker, Button} from 'antd'
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
      //'formatFormData',
      'handleAdd',
      'handleReset',
    ])
    //this.initialValues = this.getInitialValues()
  }
  
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'campaign': fieldsValue,
        'create_date_picker': fieldsValue,
        'users' : users,
        'type'  : type,
        'time_start' : time_start,
        'time_over' : time_over,
        'status'  : status


      };
      console.log('Received values of form: ', values);
    });
  }
  
  handleAdd(e) {
    browserHistory.push(`${CAMPAIGNS_URL}/new`)
  }

  handleEdit(e,id) {
    browserHistory.push(`${CAMPAIGNS_URL}/${id}/edit`)
  }
  
  handleReset() {
    this.props.form.resetFields()
  }

  handleFilter(e) {
    e.preventDefault()
    console.log('filter')
    
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
    console.log('data',data)
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
                { getFieldDecorator('campaign')(
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
                {getFieldDecorator('create_date_picker')(
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
                { getFieldDecorator('users')(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.user.placeholder.select.none'})} >
                    { users.map(user => (
                        <Option value = {user.id} key = {user.id}>{user.first_name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.type.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                { getFieldDecorator('type')(
                  <Select 
                    placeholder={intl.formatMessage({id: 'index.type.placeholder.select.none'})}
                  >
                    { type.map((item,index) => (
                        <Option value = {item.value} key={index} >{item.title}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem 
                label={intl.formatMessage({id: 'index.time_start.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                 { getFieldDecorator('time_start')(
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
                { getFieldDecorator('time_over')(
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