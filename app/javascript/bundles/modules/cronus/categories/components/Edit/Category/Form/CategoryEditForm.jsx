import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class CategoryEditForm extends React.Component {
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
    const category = editState.get('category')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCategory(category.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const category = editState.get('category')
    const isUpdatingCategory = editState.get('isUpdatingCategory')
    const isFetchingCategory = editState.get('isFetchingCategory')
    
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
        {isFetchingCategory && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {category && !category.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Name" {...this.formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Name is required!' }],
                    initialValue: category.get('name'),
                  })(<Input />)}
                </FormItem>
                <FormItem label="Code" {...this.formItemLayout}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                    initialValue: category.get('code'),
                  })(<Input />)}
                </FormItem>
                <FormItem  {...this.buttonItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingCategory}>
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

export default Form.create()(CategoryEditForm)