  import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker, Tabs } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea
const TabPane = Tabs.TabPane
const InputGroup = Input.Group

class CallLogUpdateFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const callLog = editState.get('callLog')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateCallLog(callLog.get('id'), {record: values})
      }
    })
  }

  componentDidMount(){
    const {actions} = this.props
    actions.fetchCallStatuses({per_page: 'infinite'})
  }

  render() {
    const {editState, sharedState, intl, form} = this.props
    const {getFieldDecorator} = form
    const lead = editState.get('lead')
    const callStatuses = sharedState.get('callStatuses')
    const callLog = editState.get('callLog')
    const isUpdatingCallLog = editState.get('isUpdatingCallLog')
    
    return (
      <div className="box box-with-shadow box-with-border">
        <div className="box-header">
          <h3 className="box-title">Cập nhật trạng thái cuộc gọi</h3>
        </div>
        <div className="box-body">
          <Form onSubmit={this.handleSubmit} layout="horizontal">
            <Row gutter={8}>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.call_log.attrs.agen_code.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  <Input disabled value={callLog.get('agen_code')}/>
                </FormItem>
                <FormItem 
                  label={intl.formatMessage({id: 'attrs.call_log.attrs.call_status_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('call_status_id', {
                    initialValue: (callLog.get('call_status_id') || ''),
                    rules: [{
                        required: true,
                        message: intl.formatMessage({id: 'attrs.call_log.attrs.call_status_id.errors.required'})
                    }],
                  })(
                    <Select
                      showSearch
                      placeholder={intl.formatMessage(
                        {id: 'attrs.call_log.attrs.call_status_id.placeholder.select.single'},
                      )}
                      filterOption={selectFilterOption}
                    >
                      {callStatuses.map(callStatus => (
                        <Option key={callStatus.get('id')} value={`${callStatus.get('id')}`}>
                          {callStatus.get('name')}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.call_log.attrs.station_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  <Input disabled value={callLog.get('station_id')}/>
                </FormItem>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.call_log.attrs.result_note.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  {getFieldDecorator('result_note', {
                    initialValue: callLog.get('result_note'),
                    rules: [{
                      required: true, message: intl.formatMessage({id: 'attrs.call_log.attrs.result_note.errors.required'}),
                    }]
                  })(<TextArea />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.call_log.attrs.mobile.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT}
                >
                  <Input disabled value={callLog.get('mobile')}/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
              </Col>
              <Col span={8} className="text-align--right">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingCallLog}
                >
                  {intl.formatMessage({id: 'form.form_item.button.update.text'})}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(injectIntl(CallLogUpdateFormBox))