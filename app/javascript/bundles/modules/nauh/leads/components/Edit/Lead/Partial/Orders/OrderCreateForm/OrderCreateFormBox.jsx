import React from 'react'
import _ from 'lodash'
import Immutable, { Map } from 'immutable'
import {
  Form, Input, Row, Col, Button, Select, Alert, Checkbox, Spin, Cascader,
  InputNumber, Radio, DatePicker,
} from 'antd'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { CODE_DELIMITER } from 'app/constants/cascader'
import moment from 'moment'
import {injectIntl} from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

class OrderCreateFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'renderPaymentDetails',
      'handleSubmit',
    ])
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchPaymentMethods({per_page: 'infinite'})
    actions.fetchProvinces({per_page: 'infinite'})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.createOrder(params)
      }
    })
  }

  formatFormData(values) {
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    let params = values
    if(params.record) {
      const product = params.record.product

      if(product && product.length == 2) {
        params.record.product_type = product[0]
        params.record.product_id = product[1]
      }

      params.record.lead_id = lead.get('id')
    }

    return params
  }

  getProductCascaderOptions() {
    const {sharedState} = this.props
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
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const lead = editState.get('lead')
    const isCreatingOrder = editState.get('isCreatingOrder')
    const campaigns = sharedState.get('campaigns')
    const paymentMethods = sharedState.get('paymentMethods')
    const productCascaderOptions = this.getProductCascaderOptions()
    const package_types = [
      {id: 1, value: "buy_more", text: "Mua nhiều khóa"}, 
      {id: 2, value: "single", text: "Mua một khóa"}]

    return (
      <Row gutter={16}>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          <Col span={12}>

            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.package_type.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('record.package_type', {
                rules: [
                  { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.package_type.errors.required'}) }
                ],
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  placeholder={intl.formatMessage({id: 'attrs.order.attrs.package_type.placeholder.select.single'})}
                >
                  {package_types.map(package_type => (
                    <Option value={`${package_type['value']}`} key={package_type['id']}>
                      {package_type['text']}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>


            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.product.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('record.product', {
                rules: [
                  { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.product.errors.required'}) }
                ],
              })(
                <Cascader
                  options={productCascaderOptions}
                  placeholder={intl.formatMessage({id: 'attrs.order.attrs.product.placeholder.select.single'})}
                  showSearch={{
                    filter: (inputValue, path) => path[1].label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                  }}
                />
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.promotion_price.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('record.promotion_price', {
                rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.promotion_price.errors.required'}) }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.coupon_code.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('record.coupon_code')(
                <Input/>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.campaign.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('record.campaign_code', {
                rules: [
                  { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.campaign.errors.required'}) }
                ],
              })(
                <Select
                  showSearch
                  filterOption={selectFilterOption}
                  placeholder={intl.formatMessage({id: 'attrs.order.attrs.campaign.placeholder.select.single'})}
                >
                  {campaigns.map(campaign => (
                    <Option value={`${campaign.get('code')}`} key={campaign.get('id')}>
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
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.order.attrs.payment_method.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('payment_method', {
                rules: [
                  { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.payment_method.errors.required'}) }
                ],
                initialValue: "COD",
              })(
                <RadioGroup>
                  {paymentMethods.map(method => (
                    <RadioButton value={method.get('code')} key={method.get('code')}>
                      {method.get('name')}
                    </RadioButton>
                  ))}
                </RadioGroup>
              )}
            </FormItem>
            {this.renderPaymentDetails()}
          </Col>
        </Form>
      </Row>
    );
  }

  renderPaymentDetails() {
    const {editState, sharedState, form, intl} = this.props
    const { getFieldDecorator, getFieldValue } = form
    const lead = editState.get('lead')
    const transferBanks = sharedState.get('transferBanks')
    const officeAddress = sharedState.get('officeAddress')

    const provinces = sharedState.get('provinces')
    const selectedProvince = provinces.find(p => p.get('id') == getFieldValue('payment_detail.COD.province_id'))
    const districts = selectedProvince ? selectedProvince.get('districts') : Immutable.fromJS([])
    const selectedDistrict = districts.find(d => d.get('id') == getFieldValue('payment_detail.COD.district_id'))
    const wards = selectedDistrict ? selectedDistrict.get('wards') : Immutable.fromJS([])

    const method = getFieldValue('payment_method')

    if(method == 'COD') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_adress.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.address', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_adress.errors.required'}) }],
              initialValue: lead.get('address'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_province.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.province_id', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_province.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.order.attrs.cod_province.placeholder.select.single'})}
                onChange={() => this.props.form.resetFields(['payment_detail.COD.district_id', 'payment_detail.COD.ward_id'])}
              >
                {provinces.map(province => (
                  <Option value={`${province.get('id')}`} key={province.get('id')}>
                    {`${province.get('code')} - ${province.get('name')}`}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_district.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.district_id', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_district.errors.required'}) },
              ],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.order.attrs.cod_district.placeholder.select.single'})}
                onChange={() => this.props.form.resetFields(['payment_detail.COD.ward_id'])}
              >
                {districts.map(district => (
                  <Option value={`${district.get('id')}`} key={district.get('id')}>
                    {`${district.get('code')} - ${district.get('name')}`}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_ward.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.ward_id', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_ward.errors.required'}) },
              ],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.order.attrs.cod_ward.placeholder.select.single'})}
              >
                {wards.map(ward => (
                  <Option value={`${ward.get('id')}`} key={ward.get('id')}>
                    {`${ward.get('code')} - ${ward.get('name')}`}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_expected_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.expected_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_expected_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_receiver_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.receiver_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_receiver_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_receiver_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.receiver_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.cod_receiver_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.cod_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.COD.note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'TRANSFER') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_bank.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.TRANSFER.bank_code', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.transfer_bank.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.order.attrs.transfer_bank.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_account_id.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.TRANSFER.account_id', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.transfer_account_id.errors.required'}) }],
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_booking_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.TRANSFER.booking_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.transfer_booking_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_receiver_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.TRANSFER.receiver_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.transfer_receiver_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_receiver_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.TRANSFER.receiver_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.transfer_receiver_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.transfer_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('TRANSFER.note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'OFFICE') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.office_office_address.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.OFFICE.office_address_code', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.office_office_address.errors.required'}) }],
            })(
              <Select
                showSearch
                filterOption={selectFilterOption}
                placeholder={intl.formatMessage({id: 'attrs.order.attrs.office_office_address.placeholder.select.single'})}
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
            label={intl.formatMessage({id: 'attrs.order.attrs.office_booking_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.OFFICE.booking_date', {
              rules: [
                { required: true, message: intl.formatMessage({id: 'attrs.order.attrs.office_booking_date.errors.required'}) }
              ],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.office_receiver_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.OFFICE.receiver_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.office_receiver_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.office_receiver_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.OFFICE.receiver_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.office_receiver_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.office_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('OFFICE.note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    } else if(method == 'ONE_PAY') {
      return (
        <div>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.one_pay_booking_date.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.ONE_PAY.booking_date', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.one_pay_booking_date.errors.required'}) }],
              initialValue: moment(),
            })(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.one_pay_receiver_name.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.ONE_PAY.receiver_name', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.one_pay_receiver_name.errors.required'}) }],
              initialValue: lead.get('name'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.one_pay_receiver_mobile.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.ONE_PAY.receiver_mobile', {
              rules: [{ required: true, message: intl.formatMessage({id: 'attrs.order.attrs.one_pay_receiver_mobile.errors.required'}) }],
              initialValue: lead.get('mobile'),
            })(<Input/>)}
          </FormItem>
          <FormItem
            label={intl.formatMessage({id: 'attrs.order.attrs.one_pay_note.label'})}
            {...DEFAULT_FORM_ITEM_LAYOUT}
          >
            {getFieldDecorator('payment_detail.ONE_PAY.note')(<TextArea/>)}
          </FormItem>
        </div>
      )
    }
  }
}

export default Form.create()(injectIntl(OrderCreateFormBox))