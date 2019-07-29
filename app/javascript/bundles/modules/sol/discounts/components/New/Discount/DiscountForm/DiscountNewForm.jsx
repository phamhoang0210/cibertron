
import React from 'react'
import debounce from 'lodash/debounce';
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { LANDINGPAGE_URL } from '../../../../constants/paths'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox, Icon } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import ProductOption from '../../../Base/ProductOption';

const Option = Select.Option
const FormItem = Form.Item

class DiscountNewForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'formatFormData',
      'renderMessage',
      'redirectLp',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  redirectLp(e){
    let newState = this.props.newState
    let discount = newState.get('discount').toJS()

    browserHistory.push(`${LANDINGPAGE_URL}/new?discount_id=${discount.id}`)
    window.location.reload()
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

  render() {

    const {actions, newState, sharedState, form} = this.props
    const {getFieldDecorator, getFieldValue} = this.props.form
    const alert = newState.get('alert')
    const isCreatingDiscount = newState.get('isCreatingDiscount')
    const combos = sharedState.get('combos')
    const courses = sharedState.get('courses')
    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={12}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <ProductOption
                combos={combos}
                courses={courses}
                fetchCombos={actions.fetchCombos}
                fetchCourses={actions.fetchCourses}
                form={form}
              />
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
                })(<Input placeholder="100000" />)}
              </FormItem>
              </Row>
              <FormItem label="Hiển thị giá mới" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('new_price_display', {
                  rules: [{ required: true, message: 'New price is required!' }],
                })(<Input placeholder="100.000 VNĐ" />)}
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
                { newState.get('discount') != null &&
                  <Button type="primary" className="button-margin--left--default" onClick={this.redirectLp}>
                    Create Landingpage
                  </Button>
                }
              </FormItem>

            </Form>
          </Col>
          <Col span={8} offset={3}>
            <Alert
              message="Lưu ý:"
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

export default Form.create()(DiscountNewForm)
