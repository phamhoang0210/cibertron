import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Checkbox, Row, Col, Button, Select, Alert, Spin, Cascader, Radio } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'
import {Map} from "immutable";

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class PriceEditForm extends React.Component {
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
    const {actions, editState} = this.props
    const price = editState.get('price')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updatePrice(price.get('id'), {record: values})
      }
    })
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
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const price = editState.get('price')
    const isUpdatingPrice = editState.get('isUpdatingPrice')
    const isFetchingPrice = editState.get('isFetchingPrice')
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
        {isFetchingPrice && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {price && !price.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
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
                          initialValue: `${price.get('is_sale')}`,
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

                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingPrice}>
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
    renderPricesDetails() {
        const {editState, sharedState, intl} = this.props
        const { getFieldDecorator, getFieldValue} = this.props.form
        const price = editState.get('price')
        const is_sale = price.get('is_sale')
        const is_sale_select = getFieldValue('is_sale')
        if(is_sale == '1' || is_sale_select == '1') {
            if(is_sale_select == '0') {
                return (
                    <div>

                    </div>
                )
            }
            return (
                <div>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.min_price.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('min_price', {
                            initialValue: `${price.get('min_price')}`,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label={intl.formatMessage({id: 'attrs.max_price.label'})}
                        {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                        {getFieldDecorator('max_price', {
                            initialValue: `${price.get('max_price')}`,
                        })(
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

export default Form.create()(injectIntl(PriceEditForm))