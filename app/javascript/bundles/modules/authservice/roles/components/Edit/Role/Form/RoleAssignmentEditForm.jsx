import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
const { TextArea } = Input
import AlertBox from 'partials/components/Alert/AlertBox'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { injectIntl } from 'react-intl'
import RoleAssignmentEditorBox from '../../../Shared/RoleAssignmentEditor/RoleAssignmentEditorBox'

const Option = Select.Option
const FormItem = Form.Item

class RoleAssignmentEditForm extends React.Component {
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
    const {onSubmit} = this.props
    if(onSubmit) {
      onSubmit(this.state)
    }
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const role = editState.get('role')
    const isUpdatingRole = editState.get('isUpdatingRole')
    const isFetchingRole = editState.get('isFetchingRole')
    
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
        {isFetchingRole && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row>
          <Col span={10}>
            {role && !role.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem>
                  <RoleAssignmentEditorBox
                    role={role}
                    sharedState={sharedState}
                    onChange={v => this.setState({permissions: v})}
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" loading={isUpdatingRole}>
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

export default Form.create()(injectIntl(RoleAssignmentEditForm))