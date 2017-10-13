import React from 'react'
import {Map} from 'immutable'
import _ from 'lodash'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { browserHistory } from 'react-router'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item

class NodeEditForm extends React.Component {
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
    const {actions, editState} = this.props
    const node = editState.get('node')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updateNode(node.get('id'), {record: params})
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
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const node = editState.get('node')
    const isUpdatingNode = editState.get('isUpdatingNode')
    const isFetchingNode = editState.get('isFetchingNode')
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
        {isFetchingNode && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {node && !node.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.channel_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('channel_id', {
                    rules: [
                      { required: true, message: intl.formatMessage({id: 'attrs.channel_id.errors.required'}) }
                    ],
                    initialValue: `${node.getIn(['channel', 'id'])}`,
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
                  {getFieldDecorator('worker', {
                    initialValue: [node.get('worker_type'), `${node.get('worker_id')}${CODE_DELIMITER}${node.get('worker_code')}`],
                  })(
                    <Cascader
                      options={workerCascaderOptions}
                      placeholder={intl.formatMessage({id: 'attrs.worker.placerholder.select.single'})}
                      showSearch
                    />
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.product.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('product', {
                    initialValue: [node.get('product_type'), `${node.get('product_id')}${CODE_DELIMITER}${node.get('product_code')}`],
                  })(
                    <Cascader
                      options={productCascaderOptions}
                      placeholder={intl.formatMessage({id: 'attrs.product.placerholder.select.single'})}
                      showSearch
                    />
                  )}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingNode}>
                    {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                    {intl.formatMessage({id: 'form.form_item.button.back.text'})}
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

export default Form.create()(injectIntl(NodeEditForm))