import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class LeadNewC3Form extends React.Component {
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
        label: `${combo.get('code')} - ${combo.get('name')}`
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
              <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Mobile input field */}
              <FormItem label="Mobile" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: 'Mobile is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Email input field */}
              <FormItem label="Email" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Email is required!' }],
                })(<Input />)}
              </FormItem>
              {/* Address input field */}
              <FormItem label="Address" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('address')
                (<Input />)}
              </FormItem>
              {/* Course select field */}
              <FormItem label="Course" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('course', {
                  rules: [{ required: true, message: 'Course is required!' }],
                })
                (
                  <Cascader
                    options={courseCascaderOptions}
                    placeholder="Please select course"
                    showSearch
                    filterOption={selectFilterOption}
                  />
                )}
              </FormItem>
              {/* Sourse input field */}
              <FormItem label="Source" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('source', {
                  rules: [{ required: true, message: 'Source is required!' }],
                })
                (
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
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
              <FormItem label="Source url" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('source_url')
                (<Input />)}
              </FormItem>
              {/* Type input field */}
              <FormItem label="Type" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('type')
                (
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
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
              <FormItem label="Strategy url" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('strategy')
                (
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
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
              <FormItem label="Priority url" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('priority')
                (
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
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
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingLead}>
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

export default Form.create()(LeadNewC3Form)