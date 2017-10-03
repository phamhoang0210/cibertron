import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class LandingpageNewForm extends React.Component {
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createLandingpage({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLandingpage = newState.get('isCreatingLandingpage')
    const providers = sharedState.get('providers')
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
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: 'Code is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('description')(<TextArea />)}
              </FormItem>
              <FormItem label="Provider" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('provider_id', {
                  rules: [{ required: true, message: 'Provider is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder="Please select a provider"
                  >
                    {providers.map(provider => (
                      <Option value={`${provider.get('id')}`} key={provider.get('id')}>
                        {provider.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Category" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('category_id')(
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
                <Button type="primary" htmlType="submit" loading={isCreatingLandingpage}>
                  Create
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
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

export default Form.create()(LandingpageNewForm)