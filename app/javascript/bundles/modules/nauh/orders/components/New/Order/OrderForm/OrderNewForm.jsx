import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import {
  Form, Input, Row, Col, Button, Select, Alert, Checkbox, Spin, Cascader,
  InputNumber,
} from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item
const CODE_DELIMITER = '|$|'

class OrderNewForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

    this.formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
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
    const {actions, newState} = this.props
    const lead = newState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        params.lead_id = lead.get('id')
        actions.createOrder({record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.target = product[0]
      params.course_id = product[1]
    }

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('id')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
      })
    ))

    return [
      {
        value: 'course',
        label: 'Course',
        children: courses.toJS(),
      },
      {
        value: 'combo',
        label: 'Combo',
        children: combos.toJS(),
      },
    ]
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingOrder = newState.get('isCreatingOrder')
    const isFetchingLead = newState.get('isFetchingLead')
    const campaigns = sharedState.get('campaigns')
    const lead = newState.get('lead')
    const productCascaderOptions = this.getProductCascaderOptions()
    
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
        {isFetchingLead && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          {lead && !lead.isEmpty() && (
            <Col span={10}>
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: lead.get('name'),
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Email" {...this.formItemLayout}>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Email is required!' }],
                    initialValue: lead.get('email'),
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Mobile" {...this.formItemLayout}>
                  {getFieldDecorator('mobile', {
                    rules: [{ required: true, message: 'Mobile is required!' }],
                    initialValue: lead.get('mobile'),
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Address" {...this.formItemLayout}>
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Address is required!' }],
                    initialValue: lead.get('address'),
                  })(<Input/>)}
                </FormItem>
                <FormItem label="Course" {...this.formItemLayout}>
                  {getFieldDecorator('product', {
                    rules: [{ required: true, message: 'Node is required!' }],
                  })(
                    <Cascader
                      options={productCascaderOptions}
                      placeholder="Please select course"
                      showSearch
                    />
                  )}
                </FormItem>
                <FormItem label="Promotion price" {...this.formItemLayout}>
                  {getFieldDecorator('promotion_price', {
                    rules: [{ required: true, message: 'Price is required!' }],
                  })(
                    <Input/>
                  )}
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
                          {campaign.get('code')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...this.buttonItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isCreatingOrder}
                  >
                    Create
                  </Button>
                  {/*<Button type="default" style={{marginLeft: '4px'}} onClick={this.handleBack}>
                    Back
                  </Button>*/}
                </FormItem>
              </Form>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Form.create()(OrderNewForm)