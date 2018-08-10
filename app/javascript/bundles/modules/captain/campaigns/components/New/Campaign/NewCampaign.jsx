import React from 'react'
import {Form, Row, Col, Select, RangePicker, DatePicker, Button, Input, Icon, Radio} from 'antd'
import { formItemLayout } from 'app/constants/form'
import { formDate } from 'app/constants/form'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NewCampaign extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const {intl,sharedState} = this.props
		
		return(
			<Form onSubmit={this.handleSubmit}>
				<Row>
					<FormItem {...formItemLayout} label={intl.formatMessage({id: 'new.campaign.label'})} >
						<Input placeholder={intl.formatMessage({id: 'new.campaign.placeholder.select.none'})} />
					</FormItem>
				</Row>

				<Row>
					<Col span={8}>
		        <FormItem {...formDate} label={intl.formatMessage({id: 'new.time_start.label'})} >
		          <DatePicker  style={{width: '100%'}} placeholder={intl.formatMessage({id: 'new.time_start.placeholder.select.none'})} />
		        </FormItem>
		      </Col>
	        <Col span={8}>
		        <FormItem {...formDate} label={intl.formatMessage({id: 'new.time_end.label'})} >
		          <DatePicker  style={{width: '100%'}} placeholder={intl.formatMessage({id: 'new.time_end.placeholder.select.none'})} />
		        </FormItem>
		      </Col>
		    </Row>

		    <Row>
		      <Col span={8}>
		        <FormItem {...formDate} label={intl.formatMessage({id: 'new.status.label'})} >
		          <RadioGroup>
				        <Radio value={1}>On</Radio>
				        <br />
				        <Radio value={2}>Off</Radio>
				      </RadioGroup>
		        </FormItem>
		      </Col>
		      <Col span={8}>
		        <FormItem {...formDate} label={intl.formatMessage({id: 'new.show.label'})} >
		          <RadioGroup>
				        <Radio value={1}>On</Radio>
				        <br />
				        <Radio value={2}>Off</Radio>
				      </RadioGroup>
		        </FormItem>
		      </Col>
		    </Row>

		    <Row>
					<FormItem {...formItemLayout} label={intl.formatMessage({id: 'new.link_tracking.label'})} >
						<Input placeholder={intl.formatMessage({id: 'new.link_tracking.placeholder.select.none'})} />
					</FormItem>
				</Row>

				<Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{marginRight:10}} >Tạo chiến dịch</Button>
            <Button style={{marginRight:10}}>Hủy bỏ</Button>
          </Col>
        </Row>
      </Form>
		)
	}
}

export default NewCampaign
