import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import {
  Form, Input, Row, Col, Button, Select, Alert, Checkbox, Spin, Cascader,
  InputNumber, Radio, DatePicker,
} from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import moment from 'moment'
import {injectIntl} from 'react-intl'

const Option = Select.Option
const FormItem
  = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

class PriceNewForm extends React.Component {
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.createPrice({record: params})
      }
    })
  }

  formatFormData(values) {
    const {newState} = this.props

    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.name = product[0]
      params.course_id = product[1]
    }

    params = {...params, ...params[params['method_payment']]}

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('source_id')}@${course.get('code')} - ${course.get('name')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('code')}@${combo.get('code')} - ${combo.get('name')}`,
        label: `${combo.get('code')} - ${combo.get('name')}`
      })
    ))

    return [
      {
        value: 'course',
        label: 'Course',
        children: courses.toJS(),
      },
      {
        value: 'combo',
        label: 'Combo',
        children: combos.toJS(),
      },
    ]
  }



  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingPrice = newState.get('isCreatingPrice')
    const productCascaderOptions = this.getProductCascaderOptions()
    
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
          {(
            <Row gutter={16}>
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <Col span={12}>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.product.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('product', {
                            rules: [
                                { required: true, message: intl.formatMessage({id: 'attrs.product.errors.required'}) }
                            ],
                        })(
                            <Cascader
                                options={productCascaderOptions}
                                placeholder={intl.formatMessage({id: 'attrs.product.placeholder.select.single'})}
                                showSearch
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.is_sale.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('is_sale', {
                            rules: [
                                { required: true }
                            ],
                            initialValue: '1',
                        })(
                            <RadioGroup>
                                <RadioButton value='1' key='1'>
                                    Có
                                </RadioButton>
                                <RadioButton value='0' key='0'>
                                    Không
                                </RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {this.renderPricesDetails()}
                  <FormItem
                     {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isCreatingPrice}
                    >
                      {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                    </Button>
                    {<Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                      Trở lại
                    </Button>}
                  </FormItem>
                </Col>
              </Form>
            </Row>
          )}
      </div>
    );
  }
    renderPricesDetails() {
        const {newState, sharedState, form, intl} = this.props
        const { getFieldDecorator, getFieldValue } = form
        const is_sale = getFieldValue('is_sale')

        if(is_sale == '1') {
            return (
                <div>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.min_price.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('min_price')(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.max_price.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('max_price')(
                            <Input/>
                        )}
                    </FormItem>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default Form.create()(injectIntl(PriceNewForm))