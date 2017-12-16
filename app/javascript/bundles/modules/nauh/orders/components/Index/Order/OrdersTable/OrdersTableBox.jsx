import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Row, Col, Input, Tag, Pagination } from 'antd'
import {
  getFilterParamsAndSyncUrl, getFilterParams, mergeDeep, getDefaultTablePagination,
  getInitialValueForSearch, getDefaultTableTitlePagination, generateErosOrderLink
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ORDERS_URL } from '../../../../constants/paths'
import { LEVEL_COLOR_MAPPINGS } from '../../../../constants/constants'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { EROS_BASE_URL } from 'app/constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class OrdersTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'renderTableTitle',
      'handleOpenOnEros',
    ])

    this.initialValues = this.getInitialValues()

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.lead.label'}),
      dataIndex: 'lead',
      key: 'lead',
      width: '20%',
      render: value => {
        if(value) {
          return (
            <div>
              <b>{value.name}</b><br/>
              <span>{`• ${value.email}`}</span><br/>
              <span>{`• ${value.mobile}`}</span><br/>
            </div>
          )
        }
      }
    }, {
      title: intl.formatMessage({id: 'attrs.order_level_code.label'}),
      dataIndex: 'order_level.code',
      key: 'order_level_code',
      width: '15%',
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
      title: intl.formatMessage({id: 'attrs.product.label'}),
      dataIndex: 'product_id',
      key: 'product_id',
      width: '20%',
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
      title: intl.formatMessage({id: 'attrs.promotion_price.label'}),
      dataIndex: 'promotion_price',
      key: 'promotion_price',
    }, {
      title: intl.formatMessage({id: 'attrs.payment_method.label'}),
      dataIndex: 'payment.payment_method.name',
      key: 'payment_method_name',
    },{
      title: intl.formatMessage({id: 'attrs.campaign.label'}),
      dataIndex: 'campaign_code',
      key: 'campaign_code',
    }, {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      key: 'actions',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="edit"
              type="primary"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Button
              icon="export"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleOpenOnEros(row.source_id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.eros.text'})}
            </Button>
          </div>
        )
      },
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentOrderParams = Immutable.fromJS(getFilterParams(indexState.get('orderFilters'), location))

    return {
      search: getInitialValueForSearch({}, currentOrderParams, ['lead', 'email.like']),
    }
  }

  handleDelete(orderId) {
    const {actions, indexState} = this.props
    actions.deleteOrder(orderId)
  }

  handleEdit(orderId) {
    browserHistory.push(`${ORDERS_URL}/${orderId}/edit`)
  }

  handleOpenOnEros(sourceId) {
    window.open(generateErosOrderLink(sourceId),'_blank')
  }

  handleAdd(e) {
    browserHistory.push(`${ORDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    let orderParams = {}
    const {current, pageSize, total} = pagination

    if(current != orderParams.page) {
      orderParams.page = current
    }

    orderParams = getFilterParamsAndSyncUrl(indexState.get('orderFilters'), location, orderParams)

    actions.fetchOrders(orderParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let orderParams = getFilterParamsAndSyncUrl(
      indexState.get('orderFilters'),
      location,
      {compconds: {lead: {'email.like': `%${keyword}%`}}}
    )
    actions.fetchOrders(orderParams)
  }

  render() {
    const {indexState, intl} = this.props
    const orders = indexState.get('orders')
    const paging = indexState.getIn(['orderFilters', 'paging'])
    const isFetchingOrders = indexState.get('isFetchingOrders')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              enterButton
              defaultValue={this.initialValues.search.initialValue}
              placeholder={intl.formatMessage({id: 'index.orders_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          title={this.renderTableTitle}
          size="middle"
          columns={this.columns}
          dataSource={orders.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingOrders}
        />
      </div>
    )
  }

  renderTableTitle() {
    const {indexState, actions} = this.props
    const paging = indexState.getIn(['orderFilters', 'paging'])

    return (
      <Row className="main-content-table-tools">
        <Col span={16}>
        </Col>
        <Col span={8} className="main-content-table-tools-pagination-box">
          <Pagination
            size="small"
            onChange={(page, pageSize) => this.handleTableChange({current: page}, {}, {})}
            {...getDefaultTableTitlePagination(paging.get('page'), paging.get('record_total'))}
          />
        </Col>
      </Row>
    )
  }
}

export default injectIntl(OrdersTableBox)