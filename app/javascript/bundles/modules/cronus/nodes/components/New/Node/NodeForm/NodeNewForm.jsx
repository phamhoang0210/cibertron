import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class NodeNewForm extends React.Component {
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
    if(worker) {
      params.worker_type = worker[0]
      params.worker_id = worker[1][0]
      params.worker_code = worker[1][1]
    }

    return params
  }

  getWorkerCascaderOptions() {
    const {newState, sharedState} = this.props
    const users = sharedState.get('users').map(user => (
      Map({value: [user.get('id'), user.get('username')], label: user.get('id')})
    ))
    const departments = sharedState.get('departments').map(department => (
      Map({value: [department.get('id'), department.get('code')], label: department.get('name')})
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

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingNode = newState.get('isCreatingNode')
    const channels = sharedState.get('channels')
    const workerCascaderOptions = this.getWorkerCascaderOptions()
    
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
              <FormItem label="Code" {...this.formItemLayout}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: 'Code is required!' }],
                })(<Input />)}
              </FormItem>
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
                  <Cascader options={workerCascaderOptions} onChange={null} placeholder="Please select worker" />
                )}
              </FormItem>
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