import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item

class DomainEditForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'handleAssign',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const domain = editState.get('domain')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateDomain(domain.get('id'), {record: values})
      }
    })
  }

  handleAssign(e){
    e.preventDefault()
    const {actions, editState} = this.props
    const domain = editState.get('domain')
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.assignDomain(domain.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const domain = editState.get('domain')
    const isUpdatingDomain = editState.get('isUpdatingDomain')
    const isFetchingDomain = editState.get('isFetchingDomain')
    const providers = sharedState.get('providers')
    const categories = sharedState.get('categories')
    const dnsServer = sharedState && sharedState.get('allPlatforms');
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
        {isFetchingDomain && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {domain && !domain.isEmpty() && (
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
                    initialValue: domain.get('name'),
                  })(<Input />)}
                </FormItem>

                <FormItem
                  label={intl.formatMessage({id: 'attrs.platform.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('platform_id', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.dns_server.errors.required'})
                    }],
                    initialValue: `${domain.get('platform_id') || ''}`,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                    >
                      {dnsServer.map(server => (
                        <Option value={`${server.get('id')}`} key={server.get('id')}>
                          {server.get('title')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingDomain}>
                    {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                    {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                  </Button>
                  {!domain.get('user_id') && (
                    <Button type="default" className="button-margin--left--default" onClick={this.handleAssign}>
                    Assign
                    </Button>
                  )}
                </FormItem>
              </Form>
            )} 
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(injectIntl(DomainEditForm))