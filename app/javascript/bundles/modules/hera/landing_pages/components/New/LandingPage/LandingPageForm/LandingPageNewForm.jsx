import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class LandingPageNewForm extends React.Component {
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

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingLandingPage = newState.get('isCreatingLandingPage')
    const discounts = sharedState.get('discounts')
    const domains = sharedState.get('domains')
    const facebookApps = sharedState.get('facebookApps')
    const contactTypes = sharedState.get('contactTypes')
    const landingPageTypes = sharedState.get('landingPageTypes')
    const strategies = sharedState.get('strategies')
    const selectedDiscount = discounts.find(discount => (
      discount.get('id') == getFieldValue('discount_id')
    ))

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
              <FormItem label="Name" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="Domain" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('domain_id')(
                  <Select
                    showSearch
                    allowClear
                    filterOption={selectFilterOption}
                  >
                    {domains.map(domain => (
                      <Option value={`${domain.get('id')}`} key={domain.get('id')}>
                        {domain.get('name')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Discount" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('discount_id', {
                  rules: [{ required: true, message: 'Discount is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
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
              <FormItem label="Strategy" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('strategy', {
                  rules: [{ required: true, message: 'Strategy is required!' }],
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
              <FormItem label="Ga code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('ga_code', {
                })(<Input />)}
              </FormItem>
              <FormItem label="Thankyou page" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('thankyou_page_url', {
                  initialValue: '/thankyou'
                })(<Input />)}
              </FormItem>
              <FormItem label="Landing page type" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('landing_page_type', {
                  rules: [{ required: true, message: 'Landing type is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {contactTypes.map(type => (
                      <Option value={`${type.get('id')}`} key={type.get('id')}>
                        {type.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="Facebook app" {...DEFAULT_FORM_ITEM_LAYOUT}>
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
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingLandingPage}>
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
    );
  }
}

export default Form.create()(LandingPageNewForm)