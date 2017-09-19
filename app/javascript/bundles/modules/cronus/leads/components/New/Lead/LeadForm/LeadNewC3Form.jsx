import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item
const CODE_DELIMITER = '|.|'

class LeadNewC3Form extends React.Component {
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
    const {actions, onSubmit} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(onSubmit) { onSubmit(values) }
      }
    })
  }

  getCourseCascaderOptions() {
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
        label: `${combo.get('code')} - ${combo.get('title')}`
      })
    ))

    return [
      {
        value: 'Course',
        label: 'Course',
        children: courses.toJS(),
      }, {
        value: 'Combo',
        label: 'Combo',
        children: combos.toJS(),
      }
    ]
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLead = newState.get('isCreatingLead')
    const sources = newState.get('sources')
    const types = newState.get('types')
    const strategies = newState.get('strategies')
    const priorities = newState.get('priorities')
    const courseCascaderOptions = this.getCourseCascaderOptions()
    
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
              {/* Name input field */}
              <FormItem label="Name" {...this.formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Mobile input field */}
              <FormItem label="Mobile" {...this.formItemLayout}>
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: 'Mobile is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Email input field */}
              <FormItem label="Email" {...this.formItemLayout}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Email is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Address input field */}
              <FormItem label="Address" {...this.formItemLayout}>
                {getFieldDecorator('address')
                (<Input />)}
              </FormItem>
              {/* Course select field */}
              <FormItem label="Course" {...this.formItemLayout}>
                {getFieldDecorator('course', {
                  rules: [{ required: true, message: 'Course is required!' }],
                })
                (
                  <Cascader
                    options={courseCascaderOptions}
                    placeholder="Please select course"
                    showSearch
                  />
                )}
              </FormItem>
              {/* Sourse input field */}
              <FormItem label="Source" {...this.formItemLayout}>
                {getFieldDecorator('source', {
                  rules: [{ required: true, message: 'Source is required!' }],
                })
                (
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a source"
                  >
                    {sources.map(source => (
                      <Option value={`${source.get('value')}`} key={source.get('value')}>
                        {source.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              {/* Source url input field */}
              <FormItem label="Source url" {...this.formItemLayout}>
                {getFieldDecorator('source_url')
                (<Input />)}
              </FormItem>
              {/* Type input field */}
              <FormItem label="Type" {...this.formItemLayout}>
                {getFieldDecorator('type')
                (
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a source"
                  >
                    {types.map(type => (
                      <Option value={`${type.get('value')}`} key={type.get('value')}>
                        {type.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              {/* Strategy input field */}
              <FormItem label="Strategy url" {...this.formItemLayout}>
                {getFieldDecorator('strategy')
                (
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a strategy"
                  >
                    {strategies.map(strategy => (
                      <Option value={`${strategy.get('value')}`} key={strategy.get('value')}>
                        {strategy.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              {/* Priority input field */}
              <FormItem label="Priority url" {...this.formItemLayout}>
                {getFieldDecorator('priority')
                (
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select a priority"
                  >
                    {priorities.map(priority => (
                      <Option value={`${priority.get('value')}`} key={priority.get('value')}>
                        {priority.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...this.buttonItemLayout}>
                <Button type="primary" htmlType="submit" loading={isCreatingLead}>
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

export default Form.create()(LeadNewC3Form)