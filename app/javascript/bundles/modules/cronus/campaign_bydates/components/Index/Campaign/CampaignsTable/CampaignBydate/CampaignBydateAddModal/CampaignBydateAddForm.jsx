import React from 'react'
import { Form, Modal, Button, Input, Col, Select, DatePicker} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const { Option } = Select

class CampaignBydateAddForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {form} = this.props
    const {getFieldDecorator} = form
    const {sharedState} = this.props
    const listCampaign = sharedState.get('listCampaign')

    return (
      <Form>
        <Input.Group compact>
          {getFieldDecorator('campaign_id', {
            rules: [{ required: true, message: 'Campaign is required!' }],
          })(
            <Select
               style={{ width: '25%' }}
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              placeholder="Please select a campaign"
            >
              {listCampaign.map(campaign => (
                <Option value={`${campaign.get('id')}`} key={campaign.get('id')}>
                  {campaign.get('code')}
                </Option>
              ))}
            </Select>
          )}
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Date is required!' }],
            initialValue: moment(),
          })(
            <DatePicker style={{ width: '25%' }} placeholder="date"/>
          )}
          {getFieldDecorator('c1', {
            rules: [{ required: true, message: 'C1 is required!' }],
          })(
            <Input style={{ width: '15%' }} placeholder="c1" />
          )}
          {getFieldDecorator('c2', {
            rules: [{ required: true, message: 'C2 is required!' }],
          })(
            <Input style={{ width: '15%' }} placeholder="c2" />
          )}
          {getFieldDecorator('cost', {
            rules: [{ required: true, message: 'Cost is required!' }],
          })(
            <Input style={{ width: '20%' }} placeholder="cost" />
          )}
        </Input.Group>
      </Form>
    )
  }
}

export default Form.create()(CampaignBydateAddForm)