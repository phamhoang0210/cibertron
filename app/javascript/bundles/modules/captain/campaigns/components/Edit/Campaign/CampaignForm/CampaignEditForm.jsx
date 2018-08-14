import React from 'react'
import { browserHistory } from 'react-router'
import {Form, Row, Col, Select, DatePicker, Button, Input, Radio} from 'antd'
import { formItemLayout, DEFAULT_TITLE_LAYOUT } from 'app/constants/form'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'
import { CAMPAIGNS_URL } from '../../../../constants/paths'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CampaignEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleUpdate',
    ])
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onChange = (e) => {
    console.log('checked = ${e.target.checked}');
  }

  handleBack(e) {
    browserHistory.push(`${CAMPAIGNS_URL}`)
  }

  handleUpdate(e) {
    e.preventDefault()
    console.log('props', this.props)
    const {actions, editState} = this.props
    console.log('Hello', editState)
    var campaignId = editState.getIn(['campaign', '_id', '$oid'])
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCampaign(campaignId, {record: values})
      }
    })
  }

  render(){
    const {intl,editState,sharedState} = this.props
    const left_data = editState['left_records']
    const right_data = editState['right_records']
    const { getFieldDecorator } = this.props.form
    
    return(
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <FormItem {...DEFAULT_TITLE_LAYOUT} style={{marginLeft:15, fontWeight:'bold'}} label={intl.formatMessage({id: 'edit.campaign_info.label'})} ></FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.campaign.label'})} >
            {getFieldDecorator('nameCampaign', {
              rules: [{ required: true,message: intl.formatMessage({id: 'attrs.campaign.required'},) }],
            })(
              <Input placeholder={intl.formatMessage({id: 'attrs.campaign.placeholder.select.none'})} />
            )}
          </FormItem>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_start.label'})} >
              {getFieldDecorator('startTime', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_start.required'},) }],
              })(
                <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_end.label'})} >
              {getFieldDecorator('endTime', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.time_end.required'},) }],
              })(
                <DatePicker style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.status.label'})} >
              {getFieldDecorator('status', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.status.required'},) }],
              })(
                <RadioGroup>
                  <Radio value={1}>On</Radio>
                  <br />
                  <Radio value={2}>Off</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formDate} label={intl.formatMessage({id: 'attrs.show.label'})} >
              {getFieldDecorator('show', {
                rules: [{ required: true,message: intl.formatMessage({id: 'attrs.show.required'},) }],
              })(
                <RadioGroup>
                  <Radio value={1}>On</Radio>
                  <br />
                  <Radio value={2}>Off</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem {...formItemLayout} label={intl.formatMessage({id: 'attrs.link_tracking.label'})} >
            {getFieldDecorator('linkTracking', {
              rules: [{ required: true,message: intl.formatMessage({id: 'attrs.link_tracking.required'},) }],
            })(
              <Input placeholder={intl.formatMessage({id: 'attrs.link_tracking.placeholder.select.none'})} />
            )}
          </FormItem>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{marginRight:10}} onClick={this.handleBack} >Hủy bỏ</Button>
            <Button onClick={this.handleUpdate} type="primary" htmlType="submit" style={{marginRight:10}}>Update</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(CampaignEditForm))