import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class CampaignBydateEditForm extends React.Component {
  constructor(props) {
    super(props)
    
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
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingCampaignBydate && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {campaignBydate && !campaignBydate.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: campaignBydate.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: campaignBydate.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('description', {
                    initialValue: campaignBydate.get('description'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem label="Campaign" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('campaign_id', {
                    rules: [{ required: true, message: 'Campaign is required!' }],
                    initialValue: `${campaignBydate.getIn(['campaign', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
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
                <FormItem label="Category" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('category_id', {
                    initialValue: `${campaignBydate.getIn(['category', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
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
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingCampaignBydate}>
                    Update
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
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