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

class ChannelEditForm extends React.Component {
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
    const channel = editState.get('channel')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateChannel(channel.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const channel = editState.get('channel')
    const isUpdatingChannel = editState.get('isUpdatingChannel')
    const isFetchingChannel = editState.get('isFetchingChannel')
    const providers = sharedState.get('providers')
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
        {isFetchingChannel && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {channel && !channel.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: channel.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: channel.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Description" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('description', {
                    initialValue: channel.get('description'),
                  })(<TextArea />)}
                </FormItem>
                <FormItem label="Provider" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('provider_id', {
                    rules: [{ required: true, message: 'Provider is required!' }],
                    initialValue: `${channel.getIn(['provider', 'id'])}`,
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
                    initialValue: `${channel.getIn(['category', 'id'])}`,
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
                  <Button type="primary" htmlType="submit" loading={isUpdatingChannel}>
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

export default Form.create()(ChannelEditForm)