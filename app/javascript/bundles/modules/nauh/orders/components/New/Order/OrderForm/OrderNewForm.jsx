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

class OrderNewForm extends React.Component {
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
        actions.createOrder({record: params})
      }
    })
  }

  formatFormData(values) {
    const {newState} = this.props
    const lead = newState.get('lead')

    let params = values
    const product = params.product

    if(product && product.length == 2) {
      params.target = product[0]
      params.course_id = product[1]
    }

    params.lead_id = lead.get('id')
    params = {...params, ...params[params['method_payment']]}

    return params
  }

  getProductCascaderOptions() {
    const {newState, sharedState} = this.props
    const courses = sharedState.get('courses').map(course => (
      Map({
        value: `${course.get('source_id')}`,
        label: `${course.get('code')} - ${course.get('name')}`
      })
    ))
    const combos = sharedState.get('combos').map(combo => (
      Map({
        value: `${combo.get('code')}`,
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
    const isCreatingOrder = newState.get('isCreatingOrder')
    const isFetchingLead = newState.get('isFetchingLead')
    const campaigns = sharedState.get('campaigns')
    const lead = newState.get('lead')
    const paymentMethods = newState.get('paymentMethods')
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
        {isFetchingLead && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
          {lead && !lead.isEmpty() && (
            <Row gutter={16}>
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <Col span={12}>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.name.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.name.errors.required'}) }
                      ],
                      initialValue: lead.get('name'),
                    })(<Input/>)}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.email.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.email.errors.required'}) }
                      ],
                      initialValue: lead.get('email'),
                    })(<Input/>)}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.mobile.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('mobile', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.mobile.errors.required'}) }
                      ],
                      initialValue: lead.get('mobile'),
                    })(<Input/>)}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.product.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('product', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.product.errors.required'}) }
                      ],
                    })(
                      <Cascader
                        options={productCascaderOptions}
                        placeholder={intl.formatMessage({id: 'form.form_item.product.placeholder'})}
                        showSearch
                      />
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.promotion_price.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('promotion_price', {
                      rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.promotion_price.errors.required'}) }],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.coupon_code.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('coupon_code')(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.campaign_id.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('campaign_id', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.campaign_id.errors.required'}) }
                      ],
                    })(
                      <Select
                        showSearch
                        filterOption={selectFilterOption}
                        placeholder={intl.formatMessage({id: 'form.form_item.campaign_id.placeholder'})}
                      >
                        {campaigns.map(campaign => (
                          <Option value={`${campaign.get('id')}`} key={campaign.get('id')}>
                            {campaign.get('code')}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                     {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isCreatingOrder}
                    >
                      {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                    </Button>
                    {/*<Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                      Back
                    </Button>*/}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label={intl.formatMessage({id: 'form.form_item.method_payment.label'})}
                    {...DEFAULT_FORM_ITEM_LAYOUT}
                  >
                    {getFieldDecorator('method_payment', {
                      rules: [
                        { required: true, message: intl.formatMessage({id: 'form.form_item.method_payment.errors.required'}) }
                      ],
                      initialValue: "COD",
                    })(
                      <RadioGroup>
                        {paymentMethods.map(method => (
                          <RadioButton value={method.get('value')} key={method.get('value')}>
                            {method.get('title')}
                          </RadioButton>
                        ))}
                      </RadioGroup>
                    )}
                  </FormItem>
                  {this.renderPaymentDetails()}
                </Col>
              </Form>
            </Row>
          )}
      </div>
    );
  }

  renderPaymentDetails() {
    const {newState, sharedState, form, intl} = this.props
    const { getFieldDecorator, getFieldValue } = form
    const lead = newState.get('lead')
    const transferBanks = newState.get('transferBanks')
    const officeAddress = newState.get('officeAddress')
    const provinces = sharedState.get('provinces')
    const selectedProvince = provinces.find(p => p.get('code') == getFieldValue('COD.province'))
    const districts = selectedProvince && selectedProvince.get('districts')
    const method = getFieldValue('method_payment')

    if(method == 'COD') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_address.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.address', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.cod_address.errors.required'}) }],
              initialValue: lead.get('address'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_province.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.province', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.cod_province.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'form.form_item.cod_province.placeholder'})}
              >
                {provinces.map(province => (
                  <Option value={`${province.get('code')}`} key={province.get('id')}>
                    {`${province.get('code')} - ${province.get('name')}`}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_district.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.district', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'form.form_item.cod_district.errors.required'}) },
                {
                  message: intl.formatMessage({id: 'form.form_item.cod_district.errors.not_in_province'}),
                  validator: (rule, value, cb) => {
                    if(districts && districts.find(d => d.get('name') == value)) {
                      cb()
                    } else {
                      cb(true)
                    }
                  },
                },
              ],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'form.form_item.cod_district.placeholder'})}
              >
                {districts && districts.map(district => (
                  <Option value={`${district.get('name')}`} key={district.get('code')}>
                    {`${district.get('code')} - ${district.get('name')}`}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_expected_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.expected_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.cod_expected_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.cod_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.cod_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.cod_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'TRANSFER') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_bank.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.bank', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.transfer_bank.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'form.form_item.transfer_bank.placeholder'})}
              >
                {transferBanks.map(bank => (
                  <Option value={`${bank.get('value')}`} key={bank.get('value')}>
                    {bank.get('title')}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_account_id.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.account_id', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.transfer_account_id.errors.required'}) }],
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_booking_transfer_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.booking_transfer_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.transfer_booking_transfer_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.transfer_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.transfer_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.transfer_other_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.other_note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'OFFICE') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.office_office_address.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.office_address', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.office_office_address.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'form.form_item.office_office_address.placeholder'})}
              >
                {officeAddress.map(address => (
                  <Option value={`${address.get('value')}`} key={address.get('value')}>
                    {address.get('title')}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.office_booking_office_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.booking_office_date', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'form.form_item.office_booking_office_date.errors.required'}) }
              ],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.office_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.office_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.office_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.office_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.office_other_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.other_note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'ONE_PAY') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.one_pay_booking_onepay_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.booking_onepay_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.one_pay_booking_onepay_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.one_pay_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.one_pay_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.one_pay_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.one_pay_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'form.form_item.one_pay_other_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.other_note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    }
  }
}

export default Form.create()(injectIntl(OrderNewForm))