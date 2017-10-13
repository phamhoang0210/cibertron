import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item

class NodeNewForm extends React.Component {
  constructor(props) {
    super(props)

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
    const {newState, sharedState, intl} = this.props
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
        label: intl.formatMessage({id: 'attrs.worker.cascader.user.label'}),
        children: users.toJS(),
      },
      {
        value: 'Department',
        label: intl.formatMessage({id: 'attrs.worker.cascader.department.label'}),
        children: departments.toJS(),
      }
    ]
  }

  getProductCascaderOptions() {
    const {newState, sharedState, intl} = this.props
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
        label: intl.formatMessage({id: 'attrs.product.cascader.course.label'}),
        children: courses.toJS(),
      },
      {
        value: 'Combo',
        label: intl.formatMessage({id: 'attrs.product.cascader.combo.label'}),
        children: combos.toJS(),
      },
      {
        value: 'Target',
        label: intl.formatMessage({id: 'attrs.product.cascader.target.label'}),
        children: targets.toJS(),
      }
    ]
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = newState.get('alert')
    const isCreatingNode = newState.get('isCreatingNode')
    const channels = sharedState.get('channels')
    const workerCascaderOptions = this.getWorkerCascaderOptions()
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
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.channel_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('channel_id', {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage({id: 'attrs.channel_id.errors.required'})
                    }
                  ],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder={intl.formatMessage({id: 'attrs.channel_id.placeholder.select.single'})}
                  >
                    {channels.map(channel => (
                      <Option value={`${channel.get('id')}`} key={channel.get('id')}>
                        {channel.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.worker.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('worker')(
                  <Cascader
                    options={workerCascaderOptions}
                    placeholder={intl.formatMessage({id: 'attrs.worker.placeholder.select.select'})}
                    showSearch
                  />
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.product.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('product')(
                  <Cascader
                    options={productCascaderOptions}
                    placeholder={intl.formatMessage({id: 'attrs.product.placeholder.select.single'})}
                    showSearch
                  />
                )}
              </FormItem>
              <FormItem {...DEFAULT_FORM_TAIL_LAYOUT}>
                {getFieldDecorator('auto_generate_code', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>
                    {intl.formatMessage({id: 'attrs.auto_generate_code.checkbox.text'})}
                  </Checkbox>
                )}
              </FormItem>
              {!getFieldValue('auto_generate_code') && (
                <FormItem
                  label={intl.formatMessage({id: 'attrs.code.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('code', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.code.errors.required'}) }
                    ],
                  })(<Input />)}
                </FormItem>
              )}
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreatingNode}
                >
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button
                  type="default"
                  className="button-margin--left--default"
                  onClick={this.handleBack}
                >
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(NodeNewForm))