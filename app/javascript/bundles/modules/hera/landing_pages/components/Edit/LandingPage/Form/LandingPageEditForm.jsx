import React from 'react'
import _ from 'lodash'
import { Map } from 'immutable'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin, Cascader, Icon } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
let uid = 0;
class LandingPageEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'renderMessage'
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const landingPage = editState.get('landingPage')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.updateLandingPage(landingPage.get('id'), {record: params})
      }
    })
  }

  formatFormData(values) {
    let params = values
    // do something   
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

  remove = (k) => {
    const { actions, form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length > 0) {
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    } else {
      actions.deleteCourse(k)
    }
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uid++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }


  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = editState.get('alert')
    const landingPage = editState.get('landingPage')
    const isUpdatingLandingPage = editState.get('isUpdatingLandingPage')
    const isFetchingLandingPage = editState.get('isFetchingLandingPage')
    const discounts = sharedState.get('discounts')
    const domains = sharedState.get('domains')
    const facebookApps = sharedState.get('facebookApps')
    const facebookPixelCodes = sharedState.get('facebookPixelCodes')
    const logics = sharedState.get('logics')
    const strategies = sharedState.get('strategies')
    const selectedDiscount = discounts.find(discount => (
      discount.get('id') == (getFieldValue('discount_id') || (landingPage && landingPage.get('discount_id')))
    ))
    const editorLink = editState.get('editorLink');
    const dnsServer = sharedState && sharedState.get('allPlatforms');
    // oldEditorLink
    var oldItems = []
    if(editorLink) {
       let keyID = 0;
       oldItems = editorLink.toJS().map((e, index) =>{
        return (
           <FormItem
             {...DEFAULT_FORM_ITEM_LAYOUT}
             label={'Editor Link:'}
             required={false}
             key={index}
           >
             <Row>
               {getFieldDecorator(`old_id[${index}]`,
                  { initialValue: `${e.id}` }
                )(<Input type="hidden" />)}
               {getFieldDecorator(`old_keys[${index}]`,
                  { initialValue: keyID },
                  keyID++
                )(<Input type="hidden" />)}

               {getFieldDecorator(`old_platform_id[${index}]`, {
                     rules: [{
                       required: true,
                       message: intl.formatMessage({id: 'attrs.domain_id.errors.required'}),
                     }],
                     initialValue: `${e.platform_id}`
                   })(
                     <Select
                       showSearch
                       allowClear
                       filterOption={selectFilterOption}
                       placeholder="Please select landing page"
                       style={{ width: '30%', marginRight: 8 }}
                     >
                       {dnsServer.map(server => (
                         <Option value={`${server.get('id')}`} key={server.get('id')}>
                           {server.get('title')}
                         </Option>
                       ))}
                     </Select>
                 )}

                 {getFieldDecorator(`old_link[${index}]`, {
                     rules: [{
                       required: true,
                       message: intl.formatMessage({id: 'attrs.name.errors.required'}),
                     }],
                     initialValue: `${e.link}`
                 })(<Input placeholder="link design" style={{ width:'62%', marginRight: 8 }}/>)}

                {
                   <Icon
                     className="dynamic-delete-button"
                     type="minus-circle-o"
                     onClick={() => this.remove(index)}
                   />
                }
             </Row>
           </FormItem>
        ); 
      });
    }

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formCreateEditorLinks = keys.map((k, index) => {
      return (
        <FormItem
          {...DEFAULT_FORM_ITEM_LAYOUT}
          label={'Link custom:'}
          required={false}
          key={k}
        >
          <Row>
            {getFieldDecorator(`platform_id[${k}]`, {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.domain_id.errors.required'}),
                  }],
                })(
                  <Select
                    showSearch
                    allowClear
                    filterOption={selectFilterOption}
                    placeholder="Please select landing page"
                    style={{ width: '30%', marginRight: 8 }}
                  >
                    {dnsServer.map(server => (
                      <Option value={`${server.get('id')}`} key={server.get('id')}>
                        {server.get('title')}
                      </Option>
                    ))}
                  </Select>
              )}

              {getFieldDecorator(`link[${k}]`, {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.name.errors.required'}),
                  }],
              })(<Input placeholder="link design" style={{width:'67%'}}/>)}

              {keys.length > 0 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(k)}
                />
              ) : null}
          </Row>
        </FormItem>
      );
    });

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
        {isFetchingLandingPage && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {landingPage && !landingPage.isEmpty() && (
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
                    initialValue: landingPage.get('name'),
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.domain_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('domain_id', {
                    initialValue: `${landingPage.get('domain_id') || ''}`,
                  })(
                    <Select
                      showSearch
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
                <FormItem
                  label={intl.formatMessage({id: 'attrs.discount_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('discount_id', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.discount_id.errors.required'}),
                    }],
                    initialValue: `${landingPage.get('discount_id')}`,
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
                <FormItem
                  label={intl.formatMessage({id: 'attrs.strategy.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('strategy', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.strategy.errors.required'}),
                    }],
                    initialValue: `${landingPage.get('strategy')}`,
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
                  label={intl.formatMessage({id: 'attrs.ga_code.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('ga_code', {
                    initialValue: landingPage.get('ga_code'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.ga_code.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('ga_code', {
                    initialValue: landingPage.get('ga_code'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.thankyou_page_url.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('thankyou_page_url', {
                    initialValue: landingPage.get('thankyou_page_url'),
                  })(<Input />)}
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
                    initialValue: `${landingPage.get('landing_page_type')}`,
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
                  label={intl.formatMessage({id: 'attrs.facebook_app_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('facebook_app_id', {
                    initialValue: `${landingPage.get('facebook_app_id')}`,
                  })(
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
                  {getFieldDecorator('facebook_pixel_code_id', {
                    initialValue: `${landingPage.get('facebook_pixel_code_id')}`,
                  })(
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

                {oldItems}
                {formCreateEditorLinks}

                <FormItem label="Add Link" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('course', {
                    rules: [{ required: false, message: 'Course is required!' }],
                  })(
                    <Button type="dashed" onClick={this.add}>
                      <Icon type="plus" />
                    </Button>
                  )}
                </FormItem>

                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isUpdatingLandingPage}
                  >
                    {intl.formatMessage({id: 'form.form_item.button.update.text'})}
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
            )}
          </Col>
          <Col span={10} offset={2}>
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

export default Form.create()(injectIntl(LandingPageEditForm))
