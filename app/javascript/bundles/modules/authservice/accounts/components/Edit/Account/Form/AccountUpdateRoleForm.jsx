import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const { TextArea } = Input

class AccountUpdateRoleForm extends React.Component {
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
    const {actions, editState, onSubmit} = this.props
    const account = editState.get('account')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (onSubmit) { onSubmit(values) }
      }
    })
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const account = editState.get('account')
    const adminroles = sharedState.get('adminroles')
    const roles = sharedState.get('roles')
    const isUpdatingAccount = editState.get('isUpdatingAccount')
    const isFetchingAccount = editState.get('isFetchingAccount')
    
    return (
      <div style={{marginTop: '8px'}}>
        {alert && !alert.isEmpty() && (
          <Row style={{marginBottom: '8px'}}>
            <Col span={10}>
              <AlertBox
                messages={alert.get('messages')}
                type={alert.get('type')}
              />
            </Col>
          </Row>
        )}
        {isFetchingAccount && (
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {account && !account.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem
                  label={intl.formatMessage({id: 'attrs.adminrole.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('aruser_assignment_attributes.adminrole_id', {
                    initialValue: `${account.getIn(['adminrole', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder={intl.formatMessage({id: 'attrs.adminrole.placeholder.select.single'})}
                    >
                      {adminroles.map(adminrole => (
                        <Option value={`${adminrole.get('id')}`} key={adminrole.get('id')}>
                          {adminrole.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.role.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('user_assignment_attributes.role_id', {
                    initialValue: `${account.getIn(['role', 'id'])}`,
                  })(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder={intl.formatMessage({id: 'attrs.role.placeholder.select.single'})}
                    >
                      {roles.map(role => (
                        <Option value={`${role.get('id')}`} key={role.get('id')}>
                          {role.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingAccount}>
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

export default Form.create()(injectIntl(AccountUpdateRoleForm))