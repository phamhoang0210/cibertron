import React from 'react'
import { browserHistory } from 'react-router'
import {Form, Row, Col, Select, DatePicker, Button, Input, Radio} from 'antd'
import { formItemLayout, DEFAULT_TITLE_LAYOUT } from 'app/constants/form'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME, SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CampaignEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
  }

  state = {
    radioValue: 1,
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Ahihi', this.props)
    const {actions, editState} = this.props
    console.log('editState', editState)
    var campaignId = this.props.params.id
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var record = {}
        record['name'] = values.name;
        record['start_time'] = values.start_time._i;
        record['end_time'] = values.end_time._i;
        record['status'] = (values.status == 1) ? true : false;
        record['display'] = (values.display == 1) ? true : false;
        record['link_tracking'] = values.link_tracking;
        console.log('campaignId1', campaignId)
        console.log('values', values)
        actions.updateCampaign(campaignId, record)
        console.log('Received values of form: ', record);
      }
    })
  } 

  handleBack(e) {
    browserHistory.goBack()
  }

  render(){
    const {intl, editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const campaign = editState.get('campaign')
    
    return(
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <FormItem {...DEFAULT_TITLE_LAYOUT} style={{marginLeft:15, fontWeight:'bold'}} label={intl.formatMessage({id: 'edit.campaign_info.label'})} ></FormItem>
        </Row>
        <Row>
          {campaign && (
            <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.campaign.label'})} >
              {getFieldDecorator('name', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.campaign.required'},) }],
                initialValue: campaign.get('campaign').get('name')
              })(
                <Input placeholder={intl.formatMessage({id: 'attrs.campaign.placeholder.select.none'})} />
              )}
            </FormItem>
          )}
        </Row>

        <Row>
          {campaign && (
            <Col span={8}>
              <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_start.label'})} >
                {getFieldDecorator('start_time', {
                  rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_start.required'},) }],
                  initialValue: moment(campaign.get('campaign').get('start_time'))
                })(
                  <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
                )}
              </FormItem>
            </Col>
          )}
          {campaign && (
            <Col span={8}>
              <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_end.label'})} >
                {getFieldDecorator('end_time', {
                  rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_end.required'},) }],
                  initialValue: moment(campaign.get('campaign').get('end_time'))
                })(
                  <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
                )}
              </FormItem>
            </Col>
          )}
        </Row>

        <Row>
          {campaign && (
            <Col span={8}>
              <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.status.label'})} >
                {getFieldDecorator('status', {
                  rules: [{ required: true,message: intl.formatMessage({id: 'attrs.status.required'},) }],
                  initialValue: (campaign.get('campaign').get('status') ? 1 : 0)
                })(
                  <RadioGroup>
                    <Radio value={1}>On</Radio>
                    <br />
                    <Radio value={0}>Off</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          )}
          {campaign && (
            <Col span={8}>
              <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.show.label'})} >
                {getFieldDecorator('display', {
                  rules: [{ required: true,message: intl.formatMessage({id: 'attrs.show.required'},) }],
                  initialValue: (campaign.get('campaign').get('display') ? 1 : 0)
                })(
                  <RadioGroup>
                    <Radio value={1}>On</Radio>
                    <br />
                    <Radio value={0}>Off</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          )}
        </Row>

        <Row>
          {campaign && (
            <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.link_tracking.label'})} >
              {getFieldDecorator('link_tracking', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.link_tracking.required'},) }],
                initialValue: campaign.get('campaign').get('link_tracking')
              })(
                <Input placeholder={intl.formatMessage({id: 'attrs.link_tracking.placeholder.select.none'})} />
              )}
            </FormItem>
          )}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{marginRight:10}} onClick={this.handleBack} >Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" style={{marginRight:10}}>Update</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(CampaignEditForm))