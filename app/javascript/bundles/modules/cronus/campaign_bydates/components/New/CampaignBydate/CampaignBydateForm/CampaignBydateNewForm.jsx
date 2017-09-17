import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class CampaignBydateNewForm extends React.Component {
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createCampaignBydate({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingCampaignBydate = newState.get('isCreatingCampaignBydate')
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
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem label="Name" {...this.formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Code" {...this.formItemLayout}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: 'Code is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Description" {...this.formItemLayout}>
                {getFieldDecorator('description')(<TextArea />)}
              </FormItem>
              <FormItem label="Campaign" {...this.formItemLayout}>
                {getFieldDecorator('campaign_id', {
                  rules: [{ required: true, message: 'Campaign is required!' }],
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
                {getFieldDecorator('category_id')(
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
                <Button type="primary" htmlType="submit" loading={isCreatingCampaignBydate}>
                  Create
                </Button>
                <Button type="default" style={{marginLeft: '4px'}} onClick={this.handleBack}>
                  Back
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(CampaignBydateNewForm)