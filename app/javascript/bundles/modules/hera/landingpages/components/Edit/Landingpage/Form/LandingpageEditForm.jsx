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

class LandingpageEditForm extends React.Component {
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
    const landingpage = editState.get('landingpage')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLandingpage(landingpage.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const landingpage = editState.get('landingpage')
    const isUpdatingLandingpage = editState.get('isUpdatingLandingpage')
    const isFetchingLandingpage = editState.get('isFetchingLandingpage')
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
        {isFetchingLandingpage && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {landingpage && !landingpage.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: landingpage.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: landingpage.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('description', {
                    initialValue: landingpage.get('description'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem label="Provider" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('provider_id', {
                    rules: [{ required: true, message: 'Provider is required!' }],
                    initialValue: `${landingpage.getIn(['provider', 'id'])}`,
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
                  {getFieldDecorator('category_id', {
                    initialValue: `${landingpage.getIn(['category', 'id'])}`,
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
                  <Button type="primary" htmlType="submit" loading={isUpdatingLandingpage}>
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

export default Form.create()(LandingpageEditForm)