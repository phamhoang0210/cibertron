import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {Form, Row, Col, Select, RangePicker, DatePicker, Button} from 'antd'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
const FormItem = Form.Item;
const Option = Select.Option
class CampaignsFilter extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {intl,sharedState} = this.props
    const list_campaign = sharedState['campaigns']
    console.log('huyen', this.props)
    return (
      <div className="box box-with-shadow box-with-border">
        <Form className="box-body">
          <Row gutter={40}>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.campaigns.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                  <Select placeholder={intl.formatMessage({id: 'index.campaigns.placeholder.select.none'})}  >
                    { list_campaign.map(campaign=> (
                        <Option value = {campaign.id} key = {campaign.id}>{campaign.name}</Option>
                    ))}
                  </Select>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.create_date.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                   <DatePicker  style={{width: '100%'}} placeholder={intl.formatMessage({id: 'index.create_date.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm:ss"/>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.user.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                  <Select placeholder={intl.formatMessage({id: 'index.user.placeholder.select.none'})} >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.type.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                  <Select placeholder={intl.formatMessage({id: 'index.type.placeholder.select.none'})} >
                    <Option value="china">Action</Option>
                    <Option value="use">Deaction</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.time_start.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                   <DatePicker  style={{width: '100%'}} placeholder={intl.formatMessage({id: 'index.time_start.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm:ss"/>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.time_over.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                   <DatePicker  style={{width: '100%'}} placeholder={intl.formatMessage({id: 'index.time_over.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm:ss"/>
              </FormItem>
            </Col>
            <Col span={8}> 
              <FormItem label={intl.formatMessage({id: 'index.status.label'})}
                {...FILTER_FORM_ITEM_LAYOUT}>
                  <Select placeholder={intl.formatMessage({id: 'index.status.placeholder.select.none'})} >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                  </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button style={{marginRight:10}} >Tạo chiến dịch mới</Button>
              <Button style={{marginRight:10}} type="primary">Lọc</Button>
              <Button>Clear</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

}
export default CampaignsFilter