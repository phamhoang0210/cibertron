import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Icon, Checkbox } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item

class DomainNewForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'renderMessage',
      'onCheckAutoSwitch'
    ])
    this.state = {isAutoSwitch: 0}
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.createDomain({record: {...values, is_autoswitch: this.state.isAutoSwitch}})
      }
    })
  }

  onCheckAutoSwitch(e) {
    let temp = this.state.isAutoSwitch
    this.setState({isAutoSwitch: Math.abs(temp-1)})
  }

  renderMessage(){
    return (
      <div>
        <h3><Icon type="smile-o" /> Định dạng đuôi domain:</h3>
        <h4><Icon type="check" /> .edumall.vn </h4>
        <h4><Icon type="check" /> .edumalltopica.edu.vn </h4>
        <h4><Icon type="check" /> .edumall.co.th </h4>
        <h4><Icon type="check" /> .eduvip.vn (.eduvip.vn chỉ dành cho team Comando)</h4>
        <h3><Icon type="smile-o" /> Target server: là platform nơi MKTer đã tạo landingpage cần được gắn domain</h3>
      </div>
    )
  }

  render() {
    const {newState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingDomain = newState.get('isCreatingDomain')
    const dnsServer = sharedState && sharedState.get('allPlatforms').toJS();
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
              <FormItem
                label={intl.formatMessage({id: 'attrs.name.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: intl.formatMessage({id: 'attrs.name.errors.required'}),
                  }],
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
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {dnsServer.map(server => (
                      <Option value={`${server.id}`} key={server.id}>
                        {server.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Checkbox onChange={this.onCheckAutoSwitch}>AutoSwitch</Checkbox>
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingDomain}>
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={8} offset={3}>
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

export default Form.create()(DomainNewForm)
