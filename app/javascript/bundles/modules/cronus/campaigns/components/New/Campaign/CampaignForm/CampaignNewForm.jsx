import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Checkbox } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class CampaignNewForm extends React.Component {
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
        actions.createCampaign({record: values})
      }
    })
  }

  render() {
    const {newState, sharedState} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const alert = newState.get('alert')
    const isCreatingCampaign = newState.get('isCreatingCampaign')
    const nodes = sharedState.get('nodes')
    
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
              <FormItem label="Node" {...DEFAULT_FORM_ITEM_LAYOUT}>
                {getFieldDecorator('node_id', {
                  rules: [{ required: true, message: 'Node is required!' }],
                })(
                  <Select
                    showSearch
                    filterOption={selectFilterOption}
                    placeholder="Please select a node"
                  >
                    {nodes.map(node => (
                      <Option value={`${node.get('id')}`} key={node.get('id')}>
                        {node.get('code')}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem {...DEFAULT_FORM_TAIL_LAYOUT}>
                {getFieldDecorator('auto_generate_code', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Auto generate code</Checkbox>
                )}
              </FormItem>
              {!getFieldValue('auto_generate_code') && (
                <FormItem label="Code" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('code', {
                  rules: [{ required: true, message: 'Code is required!' }],
                })(<Input />)}
                </FormItem>
              )}
              <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isCreatingCampaign}>
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

export default Form.create()(CampaignNewForm)