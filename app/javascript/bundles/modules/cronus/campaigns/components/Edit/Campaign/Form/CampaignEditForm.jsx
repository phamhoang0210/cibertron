import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { selectFilterOption } from 'helpers/antdHelper'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { Form, Input, Row, Col, Button, Select, Alert, Spin } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const Option = Select.Option
const FormItem = Form.Item

class CampaignEditForm extends React.Component {
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
    const campaign = editState.get('campaign')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCampaign(campaign.get('id'), {record: values})
      }
    })
  }

  render() {
    const {editState, sharedState} = this.props
    const { getFieldDecorator } = this.props.form
    const alert = editState.get('alert')
    const campaign = editState.get('campaign')
    const isUpdatingCampaign = editState.get('isUpdatingCampaign')
    const isFetchingCampaign = editState.get('isFetchingCampaign')
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
        {isFetchingCampaign && (
          <div className="main-content-form-box-loading-box">
            <Spin />
          </div>
        )}
        <Row className="main-content-form-box-body">
          <Col span={10}>
            {campaign && !campaign.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem label="Node" {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('node_id', {
                    rules: [{ required: true, message: 'Node is required!' }],
                    initialValue: `${campaign.getIn(['node', 'id'])}`,
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
                <FormItem  {...DEFAULT_BUTTON_ITEM_LAYOUT}>
                  <Button type="primary" htmlType="submit" loading={isUpdatingCampaign}>
                    Update
                  </Button>
                  <Button type="default" className="button-margin--left--default" onClick={this.handleBack}>
                    Back
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

export default Form.create()(CampaignEditForm)