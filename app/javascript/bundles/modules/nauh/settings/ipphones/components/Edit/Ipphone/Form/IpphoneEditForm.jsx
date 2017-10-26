import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select

class IpphoneEditForm extends React.Component {
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
    const ipphone = editState.get('ipphone')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateIpphone(ipphone.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const ipphone = editState.get('ipphone')
    const isUpdatingIpphone = editState.get('isUpdatingIpphone')
    const isFetchingIpphone = editState.get('isFetchingIpphone')
    const users = sharedState.get('users')
    
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
        {isFetchingIpphone && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {ipphone && !ipphone.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.station_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('station_id', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.station_id.errors.required'})
                    }],
                    initialValue: ipphone.get('station_id'),
                  })(<Input />)}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.user_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('user_id', {
                    initialValue: `${ipphone.get('user_id')}`,
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.user_id.errors.required'})
                    }]
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder={intl.formatMessage({id: 'attrs.user_id.placeholder.select.single'})}
                    >
                      {users.map(user => (
                        <Option value={`${user.get('id')}`} key={user.get('id')}>
                          {user.get('username')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingIpphone}>
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
}

export default Form.create()(injectIntl(IpphoneEditForm))