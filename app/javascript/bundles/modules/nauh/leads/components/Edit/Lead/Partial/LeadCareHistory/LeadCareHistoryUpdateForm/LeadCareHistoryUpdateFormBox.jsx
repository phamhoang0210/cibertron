  import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_ITEM_LAYOUT_10 } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker, Tabs } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import AlertBox from 'partials/components/Alert/AlertBox'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea
const TabPane = Tabs.TabPane
const InputGroup = Input.Group

class LeadCareHistoryUpdateFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
    this.state = {
      careStatusName: '',
    }

    this.handleLeadCareStatusSelect = this.handleLeadCareStatusSelect.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const leadCareHistory = editState.get('leadCareHistory')
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLeadCareHistory({
          record: {...values, lead_id: lead.get('id')},
          id: leadCareHistory.get('id'),
        })
      }
    })
  }

  handleLeadCareStatusSelect(value, opt) {
    const leadCareStatus = opt.props.leadCareStatus
    this.state.careStatusName = leadCareStatus.get('lead_status_care_name')
  }
  componentDidMount(){
    const {actions} = this.props
    actions.fetchLeadCareStatuses({per_page: 'infinite', orders:['id.asc']})
  }

  render() {
    const {editState, sharedState, intl, form} = this.props
    const {getFieldDecorator} = form
    const lead = editState.get('lead')
    const leadCareStatuses = sharedState.get('leadCareStatuses')
    const leadCareHistory = editState.get('leadCareHistory')
    const callLog = leadCareHistory.get('call_log')
    const isUpdatingLeadCareHistory = editState.get('isUpdatingLeadCareHistory')

    return (
      <div className="box box-with-shadow box-with-border">
        <div className="box-header">
          <h3 className="box-title">
            {intl.formatMessage({id: 'edit.lead.partial.lead_care_histories_table.lead_care_history_update_form.title'})}
          </h3>
        </div>
        <div className="box-body">
          <Form onSubmit={this.handleSubmit} layout="horizontal">
            <Row gutter={8}>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.lead_care_history.attrs.lead_care_status_id.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT_10}
                >
                  {getFieldDecorator('lead_care_status_id', {
                    rules: [{
                      required: true,
                      message: intl.formatMessage({id: 'attrs.lead_care_history.attrs.lead_care_status_id.errors.required'})
                    }],
                  })(
                    <Select
                      showSearch
                      placeholder={intl.formatMessage(
                        {id: 'attrs.lead_care_history.attrs.lead_care_status_id.placeholder.select.single'},
                      )}
                      filterOption={selectFilterOption}
                      onSelect={this.handleLeadCareStatusSelect}
                    >
                      {leadCareStatuses.map(leadCareStatus => (
                        leadCareStatus.get('id') >= 7  ?
                        <Option key={leadCareStatus.get('id')} value={`${leadCareStatus.get('id')}`} leadCareStatus={leadCareStatus}>
                          {leadCareStatus.get('lead_sub_status_id') ? leadCareStatus.get('lead_sub_status_id') + ' - ' : ''}  {leadCareStatus.get('name')}
                        </Option>
                        : ''
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
              <FormItem
                label="Trạng thái chăm sóc"
                {...DEFAULT_FORM_ITEM_LAYOUT_10}
              >
                <b>{this.state.careStatusName}</b>
              </FormItem>
              </Col>

              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT_10}
                >
                  {getFieldDecorator('result_note', {
                    initialValue: leadCareHistory.get('result_note'),
                    rules: [{
                      required: true, message: intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.errors.required'}),
                    }]
                  })(<TextArea placeholder={intl.formatMessage({id: 'attrs.lead_care_history.attrs.result_note.placeholder.textarea'})}/>)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label={intl.formatMessage({id: 'attrs.lead_care_history.attrs.schedule_at.label'})}
                  {...DEFAULT_FORM_ITEM_LAYOUT_10}
                >
                  {getFieldDecorator('schedule_at', {
                    initialValue: leadCareHistory.get('schedule_at'),
                  })(<DatePicker style={{ width: '100%' }} placeholder="Ngày hẹn gọi lại" format={LONG_DATETIME_FORMAT}
                  showTime={TIME_PICKER_DEFAULT_SHOW_TIME}/>)}
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
                  loading={isUpdatingLeadCareHistory}
                >
                  {intl.formatMessage({
                    id: leadCareHistory.isEmpty() ? 'form.form_item.button.create.text' : 'form.form_item.button.update.text'
                  })}
                  {callLog ? (<i> (Call Id: {callLog.get('id')})</i>) : ''}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(injectIntl(LeadCareHistoryUpdateFormBox))
