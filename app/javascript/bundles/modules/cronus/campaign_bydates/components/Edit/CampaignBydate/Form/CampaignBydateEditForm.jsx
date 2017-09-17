import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class CampaignBydateEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const campaignBydate = editState.get('campaignBydate')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCampaignBydate(campaignBydate.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const campaignBydate = editState.get('campaignBydate')
    const isUpdatingCampaignBydate = editState.get('isUpdatingCampaignBydate')
    const isFetchingCampaignBydate = editState.get('isFetchingCampaignBydate')
    const campaigns = sharedState.get('campaigns')
    const categories = sharedState.get('categories')
    
    return (
      <div style={{marginTop: '8px'}}>
        {alert && !alert.isEmpty() && (
          <Row style={{marginBottom: '8px'}}>
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingCampaignBydate && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {campaignBydate && !campaignBydate.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: campaignBydate.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Code" {...this.formItemLayout}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: campaignBydate.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Description" {...this.formItemLayout}>
                  {getFieldDecorator('description', {
                    initialValue: campaignBydate.get('description'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem label="Campaign" {...this.formItemLayout}>
                  {getFieldDecorator('campaign_id', {
                    rules: [{ required: true, message: 'Campaign is required!' }],
                    initialValue: `${campaignBydate.getIn(['campaign', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      placeholder="Please select a campaign"
                    >
                      {campaigns.map(campaign => (
                        <Option value={`${campaign.get('id')}`} key={campaign.get('id')}>
                          {campaign.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="Category" {...this.formItemLayout}>
                  {getFieldDecorator('category_id', {
                    initialValue: `${campaignBydate.getIn(['category', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      placeholder="Please select a category"
                    >
                      {categories.map(category => (
                        <Option value={`${category.get('id')}`} key={category.get('id')}>
                          {category.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...this.buttonItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingCampaignBydate}>
                    Update
                  </Button>
                  <Button type="default" style={{marginLeft: '4px'}} onClick={this.handleBack}>
                    Back
                  </Button>
                </FormItem>
              </Form>
            )} 
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(CampaignBydateEditForm)