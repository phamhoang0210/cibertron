import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Icon } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item
const DEFAULT_FORM_ITEM_LAYOUT = {
  labelCol: { span: 4},
  wrapperCol: {span: 12}
}
class LandingPageNewForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'renderMessage',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSearch(type, value){
    let {actions} = this.props
    switch (type){
      case 'domain':
        actions.fetchDomains({compconds: {"name.like": `%${value}%`}});
        break;
      case 'discount':
        actions.fetchDiscounts({
          fields: 'product_json',
          compconds: {"name.like": `%${value}%`}
        })
        break;
      default:
        return null
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.createLandingPage({record: params})
      }
    })
  }

  formatFormData(values) {
    const {sharedState} = this.props
    let params = values
    const discount = params.discount

    return params
  }

  renderMessage(){
    return (
      <div>
        <h3 style={{'frontWeight':'700'}}><Icon type="smile-o" /> Discount:</h3>
        <h3><Icon type="minus" /> Landingpage tuyển dụng không cần điền phần này</h3>
        <h3><Icon type="minus" /> Landingpage MKT bắt buộc phải điền phần này, và chọn đúng khóa discount → Nếu ko chọn đúng khóa, contact đổ về sẽ bị sai khóa học</h3>

        <h3><Icon type="smile-o" /> Strategy:</h3>
        <h3><Icon type="minus" /> Đối với MKT cho khóa học của Edumall, chỉ chọn 1 trong 2 strategy là "industry" hoặc "pilot"</h3>

        <h3><Icon type="smile-o" /> Loại landingpage:</h3>
        <h3><Icon type="minus" /> Chọn đúng loại C3 của landingpage và bộ phận MKT. Đối với MKT, loại C3 thường là "c3_cod", "c3_cod_no_online_payment", "c3_tele"</h3>
      </div>
    )
  }

  getDiscountIdFromUrl(){
    let params = window.location.search
    if (params != ""){
      let match = params.match(/discount_id=(\d+)/)
      if (match != null){
        return match[1].toString()
      }
    }
    return null
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLandingPage = newState.get('isCreatingLandingPage')
    const discounts = sharedState.get('discounts')
    const domains = sharedState.get('domains')
    const facebookApps = sharedState.get('facebookApps')
    const facebookPixelCodes = sharedState.get('facebookPixelCodes')
    const logics = sharedState.get('logics')
    const strategies = sharedState.get('strategies')
    let urlDiscount = discounts.find(discount => (
      discount.get('id') == this.getDiscountIdFromUrl()
    ))
    let selectedDiscount = discounts.find(discount => (
      discount.get('id') == getFieldValue('discount_id')
    ))

    selectedDiscount = selectedDiscount || urlDiscount

    return (
      <div className="main-content-form-box">
        {alert && !alert.isEmpty() && (
          <Row className="main-content-form-box-alert-box">
            <Col span={15}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col span={27}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.name.errors.required'}),
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.domain_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('domain_id', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.domain_id.errors.required'}),
                  }],
                })(
                  <Select
                    showSearch
                    allowClear
                    filterOption={selectFilterOption}
                    onSearch={this.handleSearch.bind(this, "domain")}
                  >
                    {domains.map(domain => (
                      <Option value={`${domain.get('id')}`} key={domain.get('id')}>
                        {domain.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.strategy.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('strategy', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.strategy.errors.required'}),
                  }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {strategies.map(strategy => (
                      <Option value={`${strategy.get('id')}`} key={strategy.get('id')}>
                        {strategy.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.landing_page_type.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('landing_page_type', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.landing_page_type.errors.required'}),
                  }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {logics.map(type => (
                      <Option value={`${type.get('landing_page_type')}`} key={type.get('id')}>
                        {type.get('landing_page_type')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.discount_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('discount_id', {
                  initialValue: urlDiscount && urlDiscount.get('id')
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    onSearch={this.handleSearch.bind(this, "discount")}
                  >
                    {discounts.map(discount => (
                      <Option value={`${discount.get('id')}`} key={discount.get('id')}>
                        {discount.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
                {selectedDiscount && (
                  <div>
                    <b>{`${selectedDiscount.getIn(['product_json', 'code'])} - ${selectedDiscount.getIn(['product_json', 'name'])}`}</b><br/>
                    Price: {selectedDiscount.get('old_price')}<br/>
                    Promotion price: {selectedDiscount.get('new_price')}
                  </div>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.link_custom.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('link_custom', {
                })(<Input />)}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.link_custom_one.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('link_custom_one', {
                })(<Input />)}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.link_custom_two.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('link_custom_two', {
                })(<Input />)}
              </FormItem>

              <FormItem
                label={intl.formatMessage({id: 'attrs.ga_code.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('ga_code', {
                })(<Input />)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.thankyou_page_url.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('thankyou_page_url', {
                  initialValue: '/thankyou'
                })(<Input disabled={true}/>)}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.facebook_app_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('facebook_app_id')(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {facebookApps.map(facebookApp => (
                      <Option value={`${facebookApp.get('id')}`} key={facebookApp.get('id')}>
                        {`${facebookApp.get('name')} - ${facebookApp.get('source_id')}`}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={intl.formatMessage({id: 'attrs.facebook_pixel_code_id.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('facebook_pixel_code_id')(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {facebookPixelCodes.map(facebookPixelCode => (
                      <Option value={`${facebookPixelCode.get('id')}`} key={facebookPixelCode.get('id')}>
                        {`${facebookPixelCode.get('name')} - ${facebookPixelCode.get('code')}`}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreatingLandingPage}
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
        <Row>
            <Col span={15} offset={2}>
              <Alert
                message="Lưu ý :"
                description={this.renderMessage()}
                type="info"
                showIcon
                closeText="Close"
              />
            </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(LandingPageNewForm)
