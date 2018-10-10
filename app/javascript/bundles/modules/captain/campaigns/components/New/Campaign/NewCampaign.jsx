import React from 'react'
import { browserHistory } from 'react-router';
import {Form, Row, Col, Select, RangePicker, DatePicker, Button, Input, Icon, Radio, message} from 'antd'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import { formItemLayout } from 'app/constants/form'
import { formDate } from 'app/constants/form'
import { injectIntl } from 'react-intl'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NewCampaign extends React.Component {
	constructor(props) {
		super(props)
	}
	
	state = {
    startValue: null,
    endValue: null,
		endOpen: false,
	};
	
	validateLinkFormat(link) {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_{}]*)#?(?:[\w]*))?)$/.test(link)
  }

  disabledStartDate = (startValue) => {
		const endValue = this.state.endValue;		

    if (!startValue || !endValue) {
      return false;
		}

    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
	
	handleSubmit = (e) => {
		e.preventDefault();
		const {actions, intl} = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				var val = {};
				val['name'] = values.name;
				val['start_time'] = values.start_time._d;
				val['end_time'] = values.end_time._d;
				val['status'] = values.status;
				val['display'] = values.display;
				val['link_tracking'] = values.link_tracking;
				var user_name = localStorage.getItem('gaia-uid').split("@");
				val['creator'] = user_name[0];
				val['creator_email'] = localStorage.getItem('gaia-uid');
				if (moment(val['end_time']).diff(moment(val['start_time'])) > 0) {
					actions.createCampaign(val)
				} else {
					message.warning('End date must be greater than start date')
				}
			}
		});
	}

	handleBack(e) {
		browserHistory.goBack()
	}
	
	validateCampaignLink(rule, value, callback) {
		if (value && !this.validateLinkFormat(value)) {
			const { intl } = this.props;
			callback(intl.formatMessage({id: 'attrs.link_tracking.format'}));
			return;
		}
		callback();
	}

	render(){
		const {intl, newState, sharedState}  = this.props
		const { getFieldDecorator } = this.props.form
		const { startValue, endValue, endOpen } = this.state
		return(
			<Form onSubmit={this.handleSubmit}>
				<Row>
					<FormItem
						{...formItemLayout}
						label={intl.formatMessage({id: 'attrs.campaign.label'})}
					>
						{getFieldDecorator('name', {
							rules: [
								{ required: true,message: intl.formatMessage({id: 'attrs.campaign.required'},)},
								{ whitespace: true, message: 'Tên campaign không được chứa toàn khoảng trắng' }, 
								{ max: 60, message: 'Tên campaign không được vượt quá 60 ký tự' },
								],
						})(
							<Input placeholder={intl.formatMessage({id: 'attrs.campaign.placeholder.select.none'})} />
						)}
					</FormItem>
				</Row>

				<Row>
					<Col span={8}>
						<FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_start.label'})} >
							{getFieldDecorator('start_time', {
								rules: [
									{ required: true,message: intl.formatMessage({id: 'attrs.time_start.required'}) }
								]
							})(
								<DatePicker
									showTime format="YYYY-MM-DD HH:mm:ss" 
									style={{width: '100%'}} 
									placeholder={intl.formatMessage({id: 'attrs.time_start.placeholder.select.none'})}
									// disabledDate={this.disabledStartDate}
									// value={startValue}
									onChange={this.onStartChange}
									onOpenChange={this.handleStartOpenChange}
								/>
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem {...formDate} label={intl.formatMessage({id: 'attrs.time_end.label'})} >
							{getFieldDecorator('end_time', {
								rules: [
									{ required: true,message: intl.formatMessage({id: 'attrs.time_end.required'}) }
								],
							})(
								<DatePicker
									showTime format="YYYY-MM-DD HH:mm:ss" 
									style={{width: '100%'}} 
									placeholder={intl.formatMessage({id: 'attrs.time_end.placeholder.select.none'})} 
									// disabled={this.state.endValue === null}
									// disabledDate={this.disabledEndDate}
				          // value={endValue}
				          onChange={this.onEndChange}
				          open={endOpen}
				          onOpenChange={this.handleEndOpenChange}
								/>
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
									<Radio value={0}>Off</Radio>
								</RadioGroup>
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem {...formDate} label={intl.formatMessage({id: 'attrs.show.label'})} >
							{getFieldDecorator('display', {
								rules: [{ required: true,message: intl.formatMessage({id: 'attrs.show.required'},) }],
							})(
								<RadioGroup>
									<Radio value={1}>On</Radio>
									<br />
									<Radio value={0}>Off</Radio>
								</RadioGroup>
							)}
						</FormItem>
					</Col>
				</Row>

				<Row>
					<FormItem
						{...formItemLayout}
						label={intl.formatMessage({id: 'attrs.link_tracking.label'})}
					>
						{getFieldDecorator('link_tracking', {
							rules: [
								{ required: true,message: intl.formatMessage({id: 'attrs.link_tracking.required'},)}, 
								{ whitespace: true,message: 'link_tracking không được chứa toàn khoảng trắng' },
								{ max: 255, message: intl.formatMessage({id: 'attrs.link_tracking.length'}) },
								{ validator: this.validateCampaignLink.bind(this) },
							],
						})(
							<Input placeholder={intl.formatMessage({id: 'attrs.link_tracking.placeholder.select.none'})} />
						)}
					</FormItem>
				</Row>

				<Row>
					<Col span={24} style={{ textAlign: 'center' }}>
						<Button onClick={this.handleBack} style={{marginRight:10}}>Hủy bỏ</Button>
						<Button type="primary" loading={newState.get('isCreatingCampaign')} htmlType="submit" style={{marginRight:10}} >Tạo chiến dịch</Button>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default Form.create()(injectIntl(NewCampaign))