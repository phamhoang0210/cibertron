import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Row, Col, Table, Tag, Button, Modal } from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { EROS_BASE_URL } from 'app/constants/paths'
import { getFilterParams, getDefaultTablePagination, generateErosOrderLink } from 'helpers/applicationHelper'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../../../constants/constants'
import { ORDERS_URL } from '../../../../../../constants/paths'

import 'styles/modules/nauh/leads'

class OrderTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'showOnlinePaymentModal',
      'showScheduleModal',
      'handleSendEmail',
      'handleCancelModal'
    ])

    const {intl} = this.props

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.order.attrs.id.label'}),
        dataIndex: 'id',
        key: 'id',
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.user_id.label'}),
        dataIndex: 'user_id',
        key: 'user_id',
        render: value => {
          const {sharedState} = this.props
          return sharedState.getIn(['userIdMappings', `${value}`, 'username'])
        },
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.order_level_code.label'}),
        dataIndex: 'order_level.code',
        key: 'order_level_code',
        width: '25%',
        render: (value, record) => (
          <div>
            <Tag color={LEVEL_COLOR_MAPPINGS[value]}>{value}</Tag>
            <br/>
            <p style={{padding: "4px 0px"}}>
              <i>{record.payment && record.payment.status}</i>
            </p>
          </div>
        )
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.product.label'}),
        dataIndex: 'product_id',
        key: 'product_id',
        width: '30%',
        render: (value, record) => {
          const {sharedState} = this.props
          let product = null

          if(record.product_type == 'course') {
            product = sharedState.getIn(['courseSourceIdMappings', `${value}`])
          } else if (record.product_type == 'combo') {
            product = sharedState.getIn(['comboSourceIdMappings', `${value}`])
          }

          if(product) {
            return (
              <div>
                <b>{product.get('code')}</b><br/>
                <i>{product.get('name')}</i>
              </div>
            )
          }
        }
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.promotion_price.label'}),
        dataIndex: 'promotion_price',
        key: 'promotion_price',
      }, {
        title: intl.formatMessage({id: 'attrs.order.attrs.payment_method.label'}),
        dataIndex: 'payment.payment_method.name',
        key: 'payment_method_name',
      }, {
      title: intl.formatMessage({id: 'attrs.order.attrs.actions.label'}),
      key: 'actions',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="edit"
              type="primary"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Button
              icon="export"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleOpenOnEros(row.source_id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.eros.text'})}
            </Button>
          </div>
        )
      },
    }]
  }

  state = { online_payment: false, 
            schedule: false}

  showOnlinePaymentModal = () => {
    this.setState({
      online_payment: true
    });
  }

  showScheduleModal = () => {
    this.setState({
      schedule: true
    });
  }

  handleSendEmail = (e) => {
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    const emailTemplate = editState.get('emailTemplate')
    var onlinePaymentTemplate = ''
    var scheduleTemplate = ''
    if(emailTemplate) {
      onlinePaymentTemplate = emailTemplate.get('onlinePaymentTemplate')
      scheduleTemplate = emailTemplate.get('scheduleTemplate')
    }
    if(this.state.online_payment){
      actions.sendEmail({leadId: lead.get('id'), content: onlinePaymentTemplate})
    }
    if(this.state.schedule){
      actions.sendEmail({leadId: lead.get('id'), content: scheduleTemplate})
    }

    this.setState({
      online_payment: false, schedule: false
    });
  }

  handleCancelModal = (e) => {
    this.setState({
      online_payment: false, schedule: false
    });
  }

  handleEdit(orderId) {
    window.open(`${ORDERS_URL}/${orderId}/edit`,'_blank')
  }

  handleOpenOnEros(sourceId) {
    window.open(generateErosOrderLink(sourceId),'_blank')
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, editState, location} = this.props
    const {current, pageSize, total} = pagination

    const lead = editState.get('lead')
    let leadOrderParams = getFilterParams(editState.get('orderFilters'))
    if(current != leadOrderParams.page) {
      leadOrderParams.page = current
    }

    actions.fetchOrders({fields: leadOrderParams.fields, lead_id: lead.get('id')})
  }


  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const leadOrderParams = getFilterParams(editState.get('orderFilters'))
    actions.fetchOrders({...leadOrderParams, lead_id: lead.get('id')})
  }

  render() {
    const {editState, intl} = this.props
    const orders = editState.get('orders')
    const paging = editState.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = editState.get('isFetchingOrders')

    var has_online_payment = false
    var has_schedule = false

    _.forEach(orders.toJS(), function(value) {
        var method = value.payment.payment_method.code
        if (method == "OFFICE"){
          has_schedule = true
        }
        if (method == "ONE_PAY"){
          has_online_payment = true
        }
      });

    const emailTemplate = editState.get('emailTemplate')
    var onlinePaymentTemplate = ''
    var scheduleTemplate = ''
    if(emailTemplate) {
      onlinePaymentTemplate = emailTemplate.get('onlinePaymentTemplate')
      scheduleTemplate = emailTemplate.get('scheduleTemplate')
    }
    
    return (
      <div>
        <Row>
          <Col span={24}>
          <div className="text-align--right">
              <Button
                className="button-margin--right--default"
                disabled={!has_schedule}
                icon="mail"
                type="primary"
                onClick={this.showScheduleModal}>
                {intl.formatMessage({id: 'form.form_item.button.email_schedule.text'})}
              </Button>
              <Modal
                className = 'modalCustom'
                title={intl.formatMessage({id: 'form.form_item.button.email_schedule.text'})}
                visible={this.state.schedule}
                onOk={this.handleSendEmail}
                onCancel={this.handleCancelModal}
              >
                <p dangerouslySetInnerHTML={{__html: scheduleTemplate}} />
              </Modal>

              <Button
                className="button-margin--bottom--default"
                disabled = {!has_online_payment}
                icon="mail"
                type="primary"
                onClick={this.showOnlinePaymentModal}>
                {intl.formatMessage({id: 'form.form_item.button.email_online_payment_guide.text'})}
              </Button>
              <Modal
                className = 'modalCustom'
                title={intl.formatMessage({id: 'form.form_item.button.email_online_payment_guide.text'})}
                visible={this.state.online_payment}
                onOk={this.handleSendEmail}
                onCancel={this.handleCancelModal}
              >
                <p dangerouslySetInnerHTML={{__html: onlinePaymentTemplate}} />
              </Modal>
              </div>
              </Col>

            </Row>

        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={orders.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingOrders}
        />
      </div>
    );
  }
}

export default injectIntl(OrderTableBox)