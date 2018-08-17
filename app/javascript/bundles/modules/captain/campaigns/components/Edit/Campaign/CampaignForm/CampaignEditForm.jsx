import React from 'react'
import { browserHistory } from 'react-router'
import {Form, Row, Col, Select, DatePicker, Button, Input, Radio} from 'antd'
import { formItemLayout, DEFAULT_TITLE_LAYOUT } from 'app/constants/form'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CampaignEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleChange',
      'handleSubmit',
    ])

    this.timeData = {
      start_time: null,
      end_time: null
    }
  }

  handleChange(date, id) {
    const valueOfInput = date.format(SHORT_DATETIME_FORMAT)
    // if (editState.get('campaign') && editState.get('campaign').get('campaign').get(id)) {
    //   editState.get('campaign').get('campaign').get(id) = 'valueOfInput'
    //   console.log('campaign:', editState.get('campaign').get('campaign'))
    //   console.log('T1:', editState.get('campaign').get('campaign').get(id))
    //   console.log('T2:', valueOfInput)
    // }
    // const timeState = {}
    this.timeData[id] = valueOfInput
    // this.setState(timeState)

    // console.log('editState:', editState)
  }

  componentWillReceiveProps(nextProps) {
    // const { editState } = nextProps

    // if (editState.get('campaign')) {
    //   this.timeData = {
    //     start_time: editState.get('campaign').get('campaign').get('start_time'),
    //     end_time: editState.get('campaign').get('campaign').get('end_time'),
    //   }
    // }
    // this.setState({campaign: this.props.editState.get('campaign')})
    // console.log('campaign', this.props.editState.get('campaign'));
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    var campaignId = this.props.params.id

    this.props.form.validateFields((err, values) => {
      if (!err) {
        var record = {}
        // console.log('start_time:', editState.get('campaign').get('campaign').get('start_time'))
        // console.log('end_time:', editState.get('campaign').get('campaign').get('end_time'))

        if (editState.get('campaign') && (editState.get('campaign').get('campaign').get('name') != values.name)) {
          record['name'] = values.name;
        }
        if (this.timeData.start_time) {
          record['start_time'] = this.timeData.start_time;
        }
        if (this.timeData.end_time) {
          record['end_time'] = this.timeData.end_time;  
        }
        record['status'] = (values.status == 1) ? true : false;
        record['display'] = (values.display == 1) ? true : false;
        record['link_tracking'] = values.link_tracking;
        console.log('Received values of form: ', record);

        actions.updateCampaign(campaignId, record);
      }
    })
  } 

  handleBack(e) {
    browserHistory.goBack()
  }

  render(){
    const {intl, actions, editState, sharedState} = this.props
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
                  <DatePicker onChange={(date) => this.handleChange(date, 'start_time')} style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
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
                  <DatePicker onChange={(date) => this.handleChange(date, 'end_time')} style={{width: '100%'}} placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})} showTime placeholder="Select Time" format="YYYY-MM-DD HH:mm"/>
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
            <Button type="primary" loading={editState.get('isUpdatingCampaign')} htmlType="submit" style={{marginRight:10}}>Update</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(injectIntl(CampaignEditForm))