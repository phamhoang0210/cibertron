import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Spin, Icon } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class DiscountEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'formatFormData',
      'renderMessage',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const discount = editState.get('discount')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updateDiscount(discount.get('id'), {record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.product_type = product[0]
      params.product_id = product[1].split(CODE_DELIMITER)[0]
    }

    return params
  }

  renderMessage(){
    return (
      <div>
        <h3><Icon type="smile-o" /> Sản phẩm: Chọn 1 khóa học / combo có tên cụ thể</h3>
        <h3><Icon type="smile-o" /> Hiển thị giá cũ: Là thông tin giá bị gạch đi trên landingpage</h3>
        <h3><Icon type="smile-o" /> Giá mới: Là giá bán thực tế của khóa học</h3>
        <h3><Icon type="smile-o" /> Hiển thị giá mới: Là thông tin giá bán được hiển thị trên landingpage</h3>
        <h3><Icon type="smile-o" /> Reduce (%): Là % được giảm giá hiển thị trên landingpage</h3>
        <h3 style={{'color': 'red'}}><Icon type="warning" />Check kỹ giá trần và giá sàn của TM để tránh vi phạm giá với giảng viên</h3>
      </div>
    )
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

    const {editState, sharedState} = this.props
    const {getFieldDecorator} = this.props.form
    const alert = editState.get('alert')
    const discount = editState.get('discount')
    const isUpdatingDiscount = editState.get('isUpdatingDiscount')
    const isFetchingDiscount = editState.get('isFetchingDiscount')
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

        {isFetchingDiscount && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}

        <Row>
          <Col span={10}>
            {discount && !discount.isEmpty() && (
            <Form onSubmit={this.handleSubmit} layout="horizontal">

              <FormItem label="Sản phẩm" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('product', {
                  initialValue: [discount.get('product_type'), `${discount.get('product_id')}`]
                })(
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
                  initialValue: [discount.get('old_price')],
                })(<Input placeholder="200000" />)}
              </FormItem>

              <FormItem label="Hiển thị giá cũ" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('old_price_display', {
                  rules: [{ required: true, message: 'Old price is required!' }],
                  initialValue: [discount.get('old_price_display')],
                })(<Input placeholder="200.000 VNĐ" />)}
              </FormItem>

              <FormItem label="Giá mới" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('new_price', {
                  rules: [{ required: true, message: 'New price is required!' }],
                  initialValue: [discount.get('new_price')],
                })(<Input placeholder="100000" />)}
              </FormItem>

              <FormItem label="Hiển thị giá mới" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('new_price_display', {
                  rules: [{ required: true, message: 'New price is required!' }],
                  initialValue: [discount.get('new_price_display')],
                })(<Input placeholder="100.000 VNĐ" />)}
              </FormItem>

              <FormItem label="Giảm giá(%)" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('reduce_percent', {
                  rules: [{ required: true, message: 'Reduce is required!' }],
                  initialValue: [discount.get('reduce_percent')],
                })(<Input />)}
              </FormItem>

              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isUpdatingDiscount}>
                  Update
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  Back
                </Button>
              </FormItem>
            </Form>
            )}
          </Col>
          <Col span={8} offset={3}>
            <Alert
              message="Documents create discount"
              description={this.renderMessage()}
              type="info"
              showIcon
              closeText="Close"
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(DiscountEditForm)
