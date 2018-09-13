import React from 'react'
import { browserHistory } from 'react-router'
import {Form, Row, Col, Select, DatePicker, Button, Input, Radio, message} from 'antd'
import { formItemLayout, DEFAULT_TITLE_LAYOUT } from 'app/constants/form'
import moment from 'moment'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const RadioGroup = Radio.Group

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
    const valueOfInput = date ? date.format() : ''
    this.timeData[id] = valueOfInput
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState, intl} = this.props
    var campaignId = this.props.params.id

    this.setState({linkErrorStatus: null, linkErrorMessage: null})

    this.props.form.validateFields((err, values) => {
      if (!err) {
        var record = {}

        if (editState.get('campaign') && (editState.get('campaign').get('campaign').get('name') != values.name)) {
          record['name'] = values.name
        }
        record['start_time'] = this.timeData.start_time ? this.timeData.start_time : values.start_time
        record['end_time'] = this.timeData.end_time ? this.timeData.end_time : values.end_time
        record['status'] = (values.status == 1) ? true : false
        record['display'] = (values.display == 1) ? true : false
        record['link_tracking'] = values.link_tracking
        if (moment(record['end_time']).diff(moment(record['start_time'])) > 0) {
          actions.updateCampaign(campaignId, record)
        } else {
          message.warning('End date must be greater than start date')
        }
      }
    })
  }

  validateLinkFormat(link) {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_{}]*)#?(?:[\w]*))?)$/.test(link)
  }

  validateCampaignLink(rule, value, callback) {
		if (value && !this.validateLinkFormat(value)) {
			const { intl } = this.props;
			callback(intl.formatMessage({id: 'attrs.link_tracking.format'}));
			return;
		}
		callback();
	}

  handleBack(e) {
    browserHistory.goBack()
  }

  disabledStartDate = (startValue) => {
    const endValue = this.timeData.end_time;

    if (!startValue || !endValue) {
      return false;
    }

    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.timeData.start_time;

    if (!endValue || !startValue) {
      return false;
    }

    return endValue.valueOf() <= startValue.valueOf();
  }

  render(){
    const {intl, actions, editState} = this.props
    const { getFieldDecorator } = this.props.form
    const campaign = editState.get('campaign')
    const alert = editState.toJS().alert

    if (campaign) {
      this.timeData = {
        start_time: moment(campaign.get('campaign').get('start_time')),
        end_time: moment(campaign.get('campaign').get('end_time'))
      }
    }
    
    return(
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <FormItem {...DEFAULT_TITLE_LAYOUT} style={{marginLeft:15, fontWeight:'bold'}} label={intl.formatMessage({id: 'edit.campaign_info.label'})} ></FormItem>
        </Row>
        <Row>
          {campaign && (
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'attrs.campaign.label'})}
            >
              {getFieldDecorator('name', {
                rules: [
                  { required: true,message: intl.formatMessage({id: 'attrs.campaign.required'}) },
                  { whitespace: true, message: intl.formatMessage({id: 'attrs.campaign.whitespace'}) },
                  { max: 60, message: 'Tên campaign không được vượt quá 60 ký tự' },
                ],
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
                  <DatePicker
                    onChange={(date) => this.handleChange(date, 'start_time')}
                    style={{width: '100%'}}
                    disabledDate={this.disabledStartDate.bind(this)}
                    placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})}
                    showTime
                    format="YYYY-MM-DD HH:mm"
                  />
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
                  <DatePicker
                    onChange={(date) => this.handleChange(date, 'end_time')}
                    style={{width: '100%'}}
                    disabledDate={this.disabledEndDate.bind(this)}
                    placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})}
                    showTime
                    format="YYYY-MM-DD HH:mm"
                  />
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
            <FormItem
              {...formItemLayout} label={intl.formatMessage({id: 'attrs.link_tracking.label'})}
            >
              {getFieldDecorator('link_tracking', {
                rules: [
                  { required: true, message: intl.formatMessage({id: 'attrs.link_tracking.required'}) },
                  { whitespace: true, message: intl.formatMessage({id: 'attrs.link_tracking.whitespace'}) },
                  { max: 255, message: intl.formatMessage({id: 'attrs.link_tracking.length'}) },
								  { validator: this.validateCampaignLink.bind(this) },
                ],
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