import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class DiscountNewForm extends React.Component {
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
        actions.createDiscount({record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.product_type = product[0]
      params.product_id = product[1].split(CODE_DELIMITER)[0]
      params.product_code = product[1].split(CODE_DELIMITER)[1]
    }

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('id')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('id')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
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
      }
    ]
  }


  render() {

    const {newState, sharedState} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = newState.get('alert')
    const isCreatingDiscount = newState.get('isCreatingDiscount')
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

              <FormItem label="Sản phẩm" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('product')(
                  <Cascader
                    options={productCascaderOptions}
                    placeholder="Chọn sản phẩm"
                    showSearch
                  />
                )}
              </FormItem>

              <FormItem label="Giá cũ" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('old_price', {
                  rules: [{ required: true, message: 'Old price is required!' }],
                })(<Input placeholder="200000"/>)}
              </FormItem>
              <Row>
              <FormItem label="Hiển thị giá cũ" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('old_price_display', {
                  rules: [{ required: true, message: 'Old price is required!' }],
                })(<Input placeholder="200.000 VNĐ" />)}
              </FormItem>

              <FormItem label="Giá mới" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('new_price', {
                  rules: [{ required: true, message: 'New price is required!' }],
                })(<Input placeholder="200000" />)}
              </FormItem>
              </Row>
              <FormItem label="Hiển thị giá mới" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('new_price_display', {
                  rules: [{ required: true, message: 'New price is required!' }],
                })(<Input placeholder="200.000 VNĐ" />)}
              </FormItem>

              <FormItem label="Reduce(%)" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('reduce_percent', {
                  rules: [{ required: true, message: 'Reduce is required!' }],
                })(<Input />)}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingDiscount}>
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
    )
  }
}

export default Form.create()(DiscountNewForm)