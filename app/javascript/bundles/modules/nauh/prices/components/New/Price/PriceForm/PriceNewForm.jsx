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
    const isCreatingPrice = newState.get('isCreatingPrice')
      const productCascaderOptions = this.getProductCascaderOptions()
    
    return (
      <div className="main-content-form-box">
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
                    <FormItem {...DEFAULT_FORM_TAIL_LAYOUT}>
                        {getFieldDecorator('is_sale', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Cho phép bán?</Checkbox>
                        )}
                    </FormItem>

                  <FormItem
                     {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isCreatingPrice}
                    >
                      {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                    </Button>
                    {/*<Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                      Back
                    </Button>*/}
                  </FormItem>
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
            label={intl.formatMessage({id: 'attrs.cod_adress.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.address', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.cod_adress.errors.required'}) }],
              initialValue: lead.get('address'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.cod_province.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.province', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.cod_province.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.cod_province.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.cod_district.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.district', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'attrs.cod_district.errors.required'}) },
                {
                  message: intl.formatMessage({id: 'attrs.cod_district.errors.not_in_province'}),
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
                placeholder={intl.formatMessage({id: 'attrs.cod_district.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.cod_expected_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.expected_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.cod_expected_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.cod_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.cod_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.cod_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('COD.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.cod_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.cod_note.label'})}
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
            label={intl.formatMessage({id: 'attrs.transfer_bank.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.bank', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.transfer_bank.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.transfer_bank.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.transfer_account_id.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.account_id', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.transfer_account_id.errors.required'}) }],
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.transfer_booking_transfer_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.booking_transfer_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.transfer_booking_transfer_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.transfer_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.transfer_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.transfer_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.transfer_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.transfer_other_note.label'})}
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
            label={intl.formatMessage({id: 'attrs.office_office_address.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.office_address', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.office_office_address.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.office_office_address.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.office_booking_office_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.booking_office_date', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'attrs.office_booking_office_date.errors.required'}) }
              ],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.office_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.office_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.office_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.office_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.office_other_note.label'})}
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
            label={intl.formatMessage({id: 'attrs.one_pay_booking_onepay_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.booking_onepay_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.one_pay_booking_onepay_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.one_pay_receive_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.receive_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.one_pay_receive_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.one_pay_receive_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.receive_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.one_pay_receive_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.one_pay_other_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('ONE_PAY.other_note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    }
  }
}

export default Form.create()(injectIntl(PriceNewForm))