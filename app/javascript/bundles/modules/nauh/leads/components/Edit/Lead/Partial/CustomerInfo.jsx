import React from 'react'
import _ from 'lodash'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT } from 'app/constants/form'
import { selectFilterOption } from 'helpers/antdHelper'
import {
  Form, Input, Row, Col, Button, Select, Alert, Spin, DatePicker,
  Tabs, Table
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
      width: '20%',
      render: (value, record) => (
        <div>
          {record.name}<br/>
          • {record.mobile}<br/>
          • {record.email}<br/>
        </div>
      ),
    }, {
      title: intl.formatMessage({id: 'attrs.eros_course.label'}),
      dataIndex: 'course',
      key: 'course',
      width: '30%',
      render: (value, record) => (
        <div>
          <b>{record.course_code}</b><br/>
          <i>{record.course_name}</i>
        </div>
      )
    }, {
      title: intl.formatMessage({id: 'attrs.eros_staff.label'}),
      dataIndex: 'staff',
      key: 'staff',
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
            Xem trên Eros
          </a>
        </span>
      ),
    }]
  }

  handleSubmit(e) {
    e.preventDefault()
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.updateLead(lead.get('id'), {record: values})
      }
    })
  }

  handleCall() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    actions.call(lead.get('id'))
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
    const lead = editState.get('lead')
    const isCalling = editState.get('isCalling')
    const isUpdatingLead = editState.get('isUpdatingLead')
    const isFetchingLead = editState.get('isFetchingLead')
    const leadLevels = sharedState.get('leadLevels')
    const careStatuses = sharedState.get('careStatuses')
    const users = sharedState.get('users')

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
              label={intl.formatMessage({id: 'attrs.name.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('name', {
                initialValue: lead.get('name'),
              })(<Input />)}
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
              label={intl.formatMessage({id: 'attrs.note.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}
            >
              {getFieldDecorator('note', {
                initialValue: lead.get('note'),
              })(<TextArea />)}
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
    const erosOrders = editState.get('erosOrders')

    return (
      <Table
        size="small"
        rowKey="id"
        columns={this.erosOrderColumns}
        dataSource={erosOrders.toJS()}
        pagination={{pageSize: 5}}
      />
    )
  }
}

export default Form.create()(injectIntl(CustomerInfo))