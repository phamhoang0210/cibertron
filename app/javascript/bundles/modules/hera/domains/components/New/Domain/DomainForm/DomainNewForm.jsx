import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert } from 'antd'
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
        actions.createDomain({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const domainDnsServers = sharedState.get('domainDnsServers')
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingDomain = newState.get('isCreatingDomain')
    
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
              <FormItem label="Domain" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Domain is required!' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="Type" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('dns_server', {
                  rules: [{ required: true, message: 'Domain type is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                  >
                    {domainDnsServers.map(server => (
                      <Option value={`${server.get('id')}`} key={server.get('id')}>
                        {server.get('title')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingDomain}>
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

export default Form.create()(DomainNewForm)