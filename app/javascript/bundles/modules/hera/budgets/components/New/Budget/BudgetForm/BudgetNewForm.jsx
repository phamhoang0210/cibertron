import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, message } from 'antd'
const { TextArea } = Input
const { Option } = Select
import AlertBox from 'partials/components/Alert/AlertBox'

const FormItem = Form.Item
class BudgetNewForm extends React.Component {
  constructor(props) {
    super(props)
    this.fetchAllUsers = _.debounce(
      this.props.actions.fetchAllUsers,
      800
    )
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
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      const setValues = values.staff_gid.split("_")
      const staff_gid = setValues && setValues[0]
      const staff_email = setValues && setValues[1]
      const setParams = {};
      setParams['staff_gid'] = staff_gid
      setParams['staff_email'] = staff_email;
      if (!err) {
        actions.createBudget({record: setParams})
      }
    })
  }
  handleSearch(value) {
    const {actions} = this.props
    if (!value){
      return null
    }

    this.fetchAllUsers({compconds: {"account_uid.like": `%${value}%`}})
  }
  render() {
    const {newState, sharedState, intl} = this.props
    const BudgetDnsServers = sharedState.get('BudgetDnsServers')
    const { getFieldDecorator } = this.props.form
    const alert = newState.get('alert')
    const isCreatingBudget = newState.get('isCreatingBudget')
    const users = sharedState.get('allusers')
    const setUsers = sharedState && sharedState.get('allusers').toJS()

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
                label={intl.formatMessage({id: 'attrs.email.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}
              >

                {getFieldDecorator('staff_gid',{
                   rules: [{ required: true, message: intl.formatMessage({id: 'form.form_item.button.eros.emptyEmail'}) }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder="Email"
                    allowClear
                    onSearch={this.handleSearch}
                  >
                    {
                      setUsers.map(user => {
                      return (
                          <Option value={`${user.gid}_${user.account_uid}`} key={user.gid}>
                            {user.account_uid}
                          </Option>
                       )
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingBudget}>
                  {intl.formatMessage({id: 'form.form_item.button.create.text'})}
                </Button>
                <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                  {intl.formatMessage({id: 'form.form_item.button.back.text'})}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(BudgetNewForm)
