import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

const CODE_DELIMITER = '|$|'

class NodeNewForm extends React.Component {
  constructor(props) {
    super(props)

    this.formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    this.formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
    }

    this.buttonItemLayout = {
      wrapperCol: { span: 20, offset: 4 },
    }

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'formatFormData',
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
        let params = this.formatFormData(values)
        actions.createNode({record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const worker = params.worker
    const product = params.product

    if(worker && worker.length == 2) {
      params.worker_type = worker[0]
      params.worker_id = worker[1].split(CODE_DELIMITER)[0]
      params.worker_code = worker[1].split(CODE_DELIMITER)[1]
    }
    if(product && product.length == 2) {
      params.product_type = product[0]
      params.product_id = product[1].split(CODE_DELIMITER)[0]
      params.product_code = product[1].split(CODE_DELIMITER)[1]
    }

    return params
  }

  getWorkerCascaderOptions() {
    const {newState, sharedState} = this.props
    const users = sharedState.get('users').map(user => (
      Map({
        value: `${user.get('id')}${CODE_DELIMITER}${user.get('username')}`,
        label: user.get('username')
      })
    ))
    const departments = sharedState.get('departments').map(department => (
      Map({
        value: `${department.get('id')}${CODE_DELIMITER}${department.get('code')}`,
        label: department.get('name')
      })
    ))

    return [
      {
        value: 'User',
        label: 'User',
        children: users.toJS(),
      },
      {
        value: 'Department',
        label: 'Department',
        children: departments.toJS(),
      }
    ]
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}${CODE_DELIMITER}${course.get('code')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('id')}${CODE_DELIMITER}${combo.get('code')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
      })
    ))
    const targets = sharedState.get('targets').map(target => (
      Map({
        value: `${target.get('id')}${CODE_DELIMITER}${target.get('code')}`,
        label: `${target.get('code')} - ${target.get('name')}`
      })
    ))

    return [
      {
        value: 'Course',
        label: 'Course',
        children: courses.toJS(),
      },
      {
        value: 'Combo',
        label: 'Combo',
        children: combos.toJS(),
      },
      {
        value: 'Target',
        label: 'List',
        children: targets.toJS(),
      }
    ]
  }

  render() {
    const {newState, sharedState} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = newState.get('alert')
    const isCreatingNode = newState.get('isCreatingNode')
    const channels = sharedState.get('channels')
    const workerCascaderOptions = this.getWorkerCascaderOptions()
    const productCascaderOptions = this.getProductCascaderOptions()
    
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
              <FormItem label="Channel" {...this.formItemLayout}>
                {getFieldDecorator('channel_id', {
                  rules: [{ required: true, message: 'Channel is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a channel"
                  >
                    {channels.map(channel => (
                      <Option value={`${channel.get('id')}`} key={channel.get('id')}>
                        {channel.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Worker" {...this.formItemLayout}>
                {getFieldDecorator('worker')(
                  <Cascader
                    options={workerCascaderOptions}
                    placeholder="Please select worker"
                    showSearch
                  />
                )}
              </FormItem>
              <FormItem label="Product" {...this.formItemLayout}>
                {getFieldDecorator('product')(
                  <Cascader
                    options={productCascaderOptions}
                    placeholder="Please select product"
                    showSearch
                  />
                )}
              </FormItem>
              <FormItem {...this.formTailLayout}>
                {getFieldDecorator('auto_generate_code', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Auto generate code</Checkbox>
                )}
              </FormItem>
              {!getFieldValue('auto_generate_code') && (
                <FormItem label="Code" {...this.formItemLayout}>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required!' }],
                  })(<Input />)}
                </FormItem>
              )}
              <FormItem  {...this.buttonItemLayout}>
                <Button type="primary" htmlType="submit" loading={isCreatingNode}>
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

export default Form.create()(NodeNewForm)