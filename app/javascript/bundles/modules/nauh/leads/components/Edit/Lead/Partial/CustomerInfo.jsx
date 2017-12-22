import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import {
  Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker,
  Tabs, Table, Modal
} from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { generateErosOrderLink } from 'helpers/applicationHelper'

const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea
const TabPane = Tabs.TabPane
const InputGroup = Input.Group

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleSubmit',
      'renderUpdateInfoTab',
      'renderHistoriesTab',
      'handleCall',
      'showEmailNoAnswerModal',
      'showWrongPhoneNumberModal',
      'handleSendEmail',
      'handleCancel',
      'handleTabChange',
    ])

    this.erosOrderColumns = [{
      title: intl.formatMessage({id: 'attrs.eros_created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
    }, {
      title: intl.formatMessage({id: 'attrs.eros_customer.label'}),
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (value, record) => (
        <div>
          {record.name}<br/>
          • {record.mobile}<br/>
          • {record.email}<br/>
          • <i>{record.address}</i>
        </div>
      ),
    }, {
      title: intl.formatMessage({id: 'attrs.eros_course.label'}),
      dataIndex: 'course',
      key: 'course',
      width: '25%',
      render: (value, record) => (
        <div>
          <b>{record.course_code}</b><br/>
          <i>{record.course_name}</i><br/>
        </div>
      )
    }, {
      title: intl.formatMessage({id: 'attrs.eros_staff.label'}),
      dataIndex: 'staff',
      key: 'staff',
      render: value => {
        if(typeof value == 'string') {
          var nameMatch = value.match(/^([^@]*)@/)
          var name = nameMatch ? nameMatch[1] : ''

          return name
        }
      }
    }, {
      title: intl.formatMessage({id: 'attrs.eros_level.label'}),
      dataIndex: 'level',
      key: 'level',
    }, {
      title: intl.formatMessage({id: 'attrs.eros_actions.label'}),
      key: 'actions',
      render: (text, record) => (
        <span>
          <a href={generateErosOrderLink(record.id)} target="_blank">
            {intl.formatMessage({id: 'attrs.eros_actions.view_on_eros.text'})}
          </a>
        </span>
      ),
    }]
  }

  state = { wrongPhone: false, noAnswer: false }

  handleUpdateAttr(values) {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const defaultLeadParams = editState.get('defaultLeadParams').toJS()
    actions.updateLeadAttr(lead.get('id'), {...defaultLeadParams, record: values})
  }

  // Handle show modal
  showEmailNoAnswerModal = () => {
    this.setState({
      noAnswer: true
    });
  }

  showWrongPhoneNumberModal = () => {
    this.setState({
      wrongPhone: true
    });
  }

  // Handle send email
  handleSendEmail = (e) => {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const emailTemplate = editState.get('emailTemplate')
    var noAnswerTemplate = ''
    var wrongPhoneTemplate = ''
    if(emailTemplate) {
      noAnswerTemplate = emailTemplate.get('noAnswer')
      wrongPhoneTemplate = emailTemplate.get('wrongPhone')
    }
    if(this.state.wrongPhone){
      actions.sendEmail({leadId: lead.get('id'), content: noAnswerTemplate})
    }
    if(this.state.noAnswer) {
      actions.sendEmail({leadId: lead.get('id'), content: wrongPhoneTemplate})
    }
    this.setState({
      wrongPhone: false, noAnswer: false
    });
  }

  handleCancel = (e) => {
    this.setState({
      wrongPhone: false, noAnswer: false
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.birth_day = moment(values.birth_day).format(LONG_DATETIME_FORMAT)
        values.imported_at = moment(values.imported_at).format(LONG_DATETIME_FORMAT)
        actions.updateLead(lead.get('id'), {record: values})
      }
    })
  }

  handleCall() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    actions.call(lead.get('id'))
  }
  unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }

  handleTabChange(tabKey) {
    if(tabKey == 'histories') {
      const {actions, editState} = this.props
      const lead = editState.get('lead')

      actions.fetchErosOrders({email: lead.get('email'), mobile: lead.get('mobile')})
    }
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const lead = editState.get('lead')
    const isFetchingLead = editState.get('isFetchingLead')
    
    return (
      <div className="box">
        <div className="box-body">
          <Tabs defaultActiveKey="update_info" onChange={this.handleTabChange}>
            <TabPane
              tab={intl.formatMessage({id: 'edit.lead.partial.customer_info.tabs.tab.update_info.title'})}
              key="update_info"
            >
              {this.renderUpdateInfoTab()}
            </TabPane>
            <TabPane
              tab={intl.formatMessage({id: 'edit.lead.partial.customer_info.tabs.tab.histories.title'})}
              key="histories"
            >
              {this.renderHistoriesTab()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

  renderUpdateInfoTab() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator } = this.props.form
    const isUpdatingLeadAttr = editState.get('isUpdatingLeadAttr')
    const lead = editState.get('lead')
    const isCalling = editState.get('isCalling')
    const isUpdatingLead = editState.get('isUpdatingLead')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const leadStatuses = sharedState.get('leadStatuses')
    const users = sharedState.get('users')
    const sexes = sharedState.get('sexes')

    const emailTemplate = editState.get('emailTemplate')
    var noAnswerTemplate = ''
    var wrongPhoneTemplate = ''
    if(emailTemplate) {
      noAnswerTemplate = emailTemplate.get('noAnswer')
      wrongPhoneTemplate = emailTemplate.get('wrongPhone')
    }

    var sourceDetails = ''
    const utmDetails = lead.getIn(['utm','details'])
    if (utmDetails && !utmDetails.isEmpty()) {
      utmDetails.map((value, key) => (
        sourceDetails += `${key} : ${value} \n`
      ))
    }
    

    const sexOptions = [];
    sexes.map(sex => (
      sexOptions.push(<Option key={sex.get('id')} value={`${sex.get('id')}`}>
        {sex.get('name')}
      </Option>)
    ))

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.email.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('email', {
                initialValue: lead.get('email'),
                rules: [{
                  required: true, message: intl.formatMessage({id: 'attrs.email.errors.required'}),
                }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.mobile.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              <InputGroup compact>
                {getFieldDecorator('mobile', {
                  initialValue: lead.get('mobile'),
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'attrs.mobile.errors.required'}),
                  }]
                })(<Input style={{width: '70%'}} size="large"/>)}
                <Button
                  icon="phone"
                  style={{width: '30%'}}
                  type="primary"
                  size="large"
                  onClick={this.handleCall}
                  loading={isCalling}
                >
                  {intl.formatMessage({id: 'form.form_item.button.call.text'})}
                </Button>
              </InputGroup>
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.sex.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('sex_id', {
                initialValue: lead.get('sex_id') ? `${lead.getIn(['sex','id'])}` : ``,
              })(
                <Select>
                  {sexOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.name.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('name', {
                initialValue: lead.get('name'),
              })(<Input />)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.interest.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('interest', {
                initialValue: lead.get('interest'),
              })(<TextArea/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={intl.formatMessage({id: 'attrs.imported_at.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('imported_at', {
                initialValue: lead.get('imported_at') && moment(lead.get('imported_at')),
                rules: [{
                  required: true, message: intl.formatMessage({id: 'attrs.imported_at.errors.required'}),
                }]
              })(<DatePicker className="width--full"/>)}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.address.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('address', {
                initialValue: lead.get('address'),
              })(<Input />)}
            </FormItem>

            <FormItem
              label={intl.formatMessage({id: 'attrs.birth_day.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('birth_day', {
                initialValue: lead.get('birth_day') && moment(lead.get('birth_day'))
              })(<DatePicker className="width--full"/>)}
            </FormItem>

            <FormItem
              label={intl.formatMessage({id: 'attrs.note.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('note', {
                initialValue: lead.get('note'),
              })(<TextArea />)}
            </FormItem>

            <FormItem
              label={intl.formatMessage({id: 'attrs.source.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('utm', {
                initialValue: sourceDetails,
              })(<TextArea disabled rows={4} />)}
            </FormItem>

          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Button
              className="button-margin--right--default"
              onClick={this.showWrongPhoneNumberModal}
            >
              {intl.formatMessage({id: 'form.form_item.button.email_wrong_phone_number.text'})}
            </Button>
            <Modal
              className = 'modalCustom'
              title="Wrong Phone Number"
              visible={this.state.wrongPhone}
              onOk={this.handleSendEmail}
              onCancel={this.handleCancel}
            >
              <p dangerouslySetInnerHTML={{__html: wrongPhoneTemplate}} />
            </Modal>
            <Button
              onClick={this.showEmailNoAnswerModal}
            >
              {intl.formatMessage({id: 'form.form_item.button.email_no_answer.text'})}
            </Button>
            <Modal
              className = 'modalCustom'
              title="No Answer"
              visible={this.state.noAnswer}
              onOk={this.handleSendEmail}
              onCancel={this.handleCancel}
            >
              <p dangerouslySetInnerHTML={{__html: noAnswerTemplate}} />
            </Modal>
          </Col>

          <Col span={8} className="text-align--right">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdatingLead}
            >
              {intl.formatMessage({id: 'form.form_item.button.update.text'})}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }

  renderHistoriesTab() {
    const {editState} = this.props
    const isFetchingErosOrders = editState.get('isFetchingErosOrders')
    const erosOrders = editState.get('erosOrders')

    return (
      <Table
        size="small"
        rowKey="id"
        columns={this.erosOrderColumns}
        dataSource={erosOrders.toJS()}
        pagination={{pageSize: 5}}
        loading={isFetchingErosOrders}
      />
    )
  }
}

export default Form.create()(injectIntl(CustomerInfo))