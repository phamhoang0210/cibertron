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

class DomainRestoreForm extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleBack',
      'handleSubmit',
      'handleSearch',
    ])
  }

  handleBack(e) {
    browserHistory.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, restoreState} = this.props
    const domain = restoreState.get('domain')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateDomain(domain.get('id'), {record: values})
      }
    })
  }

  handleSearch(value) {
    const {actions} = this.props
    value != "" ? actions.fetchAllUsers({keyword: value}) : ''

  }

  render() {
    const {restoreState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = restoreState.get('alert')
    const domain = restoreState.get('domain')
    const isUpdatingDomain = restoreState.get('isUpdatingDomain')
    const isFetchingDomain = restoreState.get('isFetchingDomain')
    const setUsers = sharedState && sharedState.get('allusers').toJS()
    if (domain){
      let u = {id: parseInt(domain.get('user_id')), nickname: domain.get('username')}
      setUsers.push(u)
    }

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
                    initialValue: domain.get('name'),
                  })(<Input disabled />)}
                </FormItem>

                <FormItem
                label={intl.formatMessage({id: 'attrs.username.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
                >

                  {getFieldDecorator('user_id', {initialValue: `${domain.get('user_id')}`})(
                    <Select
                      showSearch
                      filterOption={selectFilterOption}
                      placeholder="User name"
                      allowClear={true}
                      onSearch={this.handleSearch}
                    >
                      {setUsers.map(user => (
                        <Option value={`${user.id}`} key={user.id}>
                          {user.nickname}
                        </Option>

                      ))}
                    </Select>
                  )}
                </FormItem>

                <div hidden>
                  <FormItem>
                    {getFieldDecorator('id', {
                      initialValue: domain.get('id'),
                    })(<Input disabled />)}
                  </FormItem>
                </div>
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingDomain}>
                    {intl.formatMessage({id: 'form.form_item.button.restore.text'})}
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

export default Form.create()(injectIntl(DomainRestoreForm))