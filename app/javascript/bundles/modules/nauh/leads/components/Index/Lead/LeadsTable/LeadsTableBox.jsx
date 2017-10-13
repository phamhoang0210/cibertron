import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LEADS_URL, ORDERS_URL } from '../../../../constants/paths'
import OrdersTableBox from './OrdersTable/OrdersTableBox'
import EmailLeadsTableBox from './EmailLeadsTable/EmailLeadsTableBox'
import LeadImportModalBox from './LeadImportModal/LeadImportModalBox'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'
import TextEditable from 'partials/components/ContentEditable/Text/TextEditable'
import SelectEditable from 'partials/components/ContentEditable/Select/SelectEditable'
import LeadUpdateMultipleBox from './LeadUpdateMultiple/LeadUpdateMultipleBox'
import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane
const LEVEL_COLOR_MAPPINGS = {
  'A0': 'orange',
  'A1': '#2db7f5',
  'A2': '#108ee9',
  'A3': '#87d068',
  'A3X': '#f50',
}

const BADGE_STATUS_MAPPINGS = {
  'default': 'warning',
  'processing': 'processing',
  'done': 'success',
  'cancelled': 'default',
}

class LeadsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.state = {
      showImportModal: false,
    }

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleCreateOrder',
      'handleAssign',
      'handleUpdateAttrs',
      'handleSelectionChange',
      'renderTableTitle',
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'name',
      key: 'info',
      width: '15%',
      render: (value, record) => (
        <div>
          <b>{record.name}</b><br/>
          <span>{`• ${record.email}`}</span><br/>
          <span>{`• ${record.mobile}`}</span><br/>
        </div>
      )
    }, {
      title: intl.formatMessage({id: 'attrs.interest.label'}),
      dataIndex: 'interest',
      key: 'interest',
      width: '12%',
      render: (value, record) => (
        <TextEditable
          className="table-row-height--md"
          tagName="div"
          html={value}
          disabled={true}
          onChange={v => this.handleUpdateAttrs(record.id, {interest: v})}
        />
      )
    }, {
      title: intl.formatMessage({id: 'attrs.note.label'}),
      dataIndex: 'note',
      key: 'note',
      width: '12%',
      render: (value, record) => (
        <TextEditable
          className="table-row-height--md"
          tagName="div"
          html={value}
          disabled={true}
          onChange={v => this.handleUpdateAttrs(record.id, {note: v})}
        />
      )
    }, {
      title: intl.formatMessage({id: 'attrs.assigned_at.label'}),
      dataIndex: 'assigned_at',
      key: 'assigned_at',
      sorter: true,
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: intl.formatMessage({id: 'attrs.imported_at.label'}),
      dataIndex: 'imported_at',
      key: 'imported_at',
      sorter: true,
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: intl.formatMessage({id: 'attrs.care_status_id.label'}),
      dataIndex: 'care_status.code',
      key: 'care_status_code',
      render: (value, record) => {
        const {sharedState} = this.props
        const careStatuses = sharedState.get('careStatuses')

        return (
          <SelectEditable
            onChange={v => this.handleUpdateAttrs(record.id, {care_status_id: v})}
            defaultValue={`${record.care_status && record.care_status.id}`}
            disabled={record.isUpdating}
            disabledContent={(<Badge status={BADGE_STATUS_MAPPINGS[value]} text={value} />)}
            options={careStatuses.map(item => (
              item.merge({
                title: item.get('code'),
              })
            ))}
          />
        )
      }
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level_id.label'}),
      dataIndex: 'lead_level.name',
      key: 'lead_level_name',
      render: (value, record) => {
        const {sharedState} = this.props
        const leadLevels = sharedState.get('leadLevels')
        return (
          <SelectEditable
            onChange={v => this.handleUpdateAttrs(record.id, {lead_level_id: v})}
            defaultValue={`${record.lead_level && record.lead_level.id}`}
            disabled={record.isUpdating}
            disabledContent={(<Tag color={LEVEL_COLOR_MAPPINGS[value]}>{value}</Tag>)}
            options={leadLevels.map(item => (
              item.merge({
                title: item.get('name'),
              })
            ))}
          />
        )
      }
    }, {
      title: intl.formatMessage({id: 'attrs.staff_id.label'}),
      dataIndex: 'staff_id',
      key: 'staff_id',
      render: (value, record) => {
        const {sharedState} = this.props
        const users = sharedState.get('users')
        const user = users.find(u => u.get('id') == value)
        return (
          <SelectEditable
            onChange={v => this.handleUpdateAttrs(record.id, {staff_id: v})}
            defaultValue={`${value}`}
            disabled={record.isUpdating}
            disabledContent={user ? <b>{user.get('username')}</b> : <i className="text--link">Assign</i>}
            options={users.map(item => (
              item.merge({
                title: item.get('username'),
              })
            ))}
          />
        )
      }
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      key: 'action',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="plus"
              type="primary"
              style={{ width: '100%'}}
              onClick={(e) => this.handleCreateOrder(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.order.text'})}
            </Button>
            <br/>
            <Button
              icon="edit"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <br/>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={() => this.handleDelete(row.id)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
              <Button
                icon="delete"
                className="button-margin--top--default"
                type="danger"
                loading={row.isDeleting}
                style={{ width: '100%' }}
              >
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
          </div>
        )
      },
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentLeadFilters = Immutable.fromJS(getFilterParams(indexState.get('leadFilters'), location))
    return {
      search: getInitialValueForSearch({}, currentLeadFilters, ['email.like']),
    }
  }

  handleDelete(leadId) {
    const {actions, indexState} = this.props
    actions.deleteLead(leadId)
  }

  handleEdit(leadId) {
    browserHistory.push(`${LEADS_URL}/${leadId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${LEADS_URL}/new`)
  }

  handleCreateOrder(leadId) {
    window.open(`${ORDERS_URL}/new?lead_id=${leadId}` , '_blank')
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let leadParams = {}
    if(current != leadParams.page) {
      leadParams.page = current
    }

    if(sorter.field) {
      leadParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    leadParams = getFilterParamsAndSyncUrl(indexState.get('leadFilters'), location, leadParams)

    actions.fetchLeads(leadParams)
  }

  handleSelectionChange(selectedRowKeys, selectedRows) {
    const {actions, indexState} = this.props
    actions.updateSelectedLeadKeys(selectedRowKeys)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let leadParams = getFilterParamsAndSyncUrl(indexState.get('leadFilters'), location, {compconds: {'email.like': `%${keyword}%`}})
    actions.fetchLeads(leadParams)
  }

  handleAssign() {
    browserHistory.push(`${LEADS_URL}/assign`)
  }

  handleUpdateAttrs(id, values) {
    const {actions} = this.props
    actions.updateLeadAttrs(id, {fields: 'lead_level{},care_status{}', record: values})
  }


  render() {
    const {indexState, actions, intl} = this.props
    const selectedLeadKeys = indexState.get('selectedLeadKeys')
    const leads = indexState.get('leads')
    const paging = indexState.getIn(['leadFilters', 'paging'])
    const isFetchingLeads = indexState.get('isFetchingLeads')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
            <Button
              className="button-margin--left--default"
              onClick={(e) => this.setState({showImportModal: true})}
            >
              {intl.formatMessage({id: 'form.form_item.button.import.text'})}
            </Button>
            <LeadImportModalBox
              {...this.props}
              visible={this.state.showImportModal}
              handleCancel={() => this.setState({showImportModal: false})}
            />
            <Button
              className="button-margin--left--default"
              onClick={this.handleAssign}
            >
              {intl.formatMessage({id: 'form.form_item.button.assign.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              defaultValue={this.initialValues.search.initialValue}
              placeholder={intl.formatMessage({id: 'index.leads_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          title={this.renderTableTitle}
          size="middle"
          columns={this.columns}
          dataSource={leads.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowSelection={{
            selectedRowKeys: selectedLeadKeys.toJS(),
            onChange: this.handleSelectionChange
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingLeads}
          expandedRowRender={record => {
            const lead = Immutable.fromJS(record)
            const orderCount = lead.getIn(['orderFilters', 'paging', 'record_total'])
            const emailLeadCount = lead.getIn(['emailLeadFilters', 'paging', 'record_total'])
            return (
              <Tabs defaultActiveKey="email_leads" style={{background: '#fff'}}>
                <TabPane
                  tab={intl.formatMessage(
                    {id: 'index.leads_table.expanded_row.tabs.tab.email_leads.title'},
                    {emailLeadCount: typeof emailLeadCount != "undefined" ? emailLeadCount : '..'}
                  )}
                  key="email_leads"
                >
                  <EmailLeadsTableBox
                    lead={lead}
                    actions={actions}
                  />
                </TabPane>
                <TabPane
                  tab={intl.formatMessage(
                    {id: 'index.leads_table.expanded_row.tabs.tab.orders.title'},
                    {orderCount: typeof orderCount != "undefined" ? orderCount : '..'}
                  )}
                  key="orders"
                >
                  <OrdersTableBox
                    lead={lead}
                    actions={actions}
                  />
                </TabPane>
              </Tabs>
            )
          }}
        />
      </div>
    )
  }

  renderTableTitle() {
    const {indexState, actions} = this.props
    const selectedLeadKeys = indexState.get('selectedLeadKeys')
    const paging = indexState.getIn(['leadFilters', 'paging'])

    return (
      <Row className="main-content-table-tools">
        <Col span={16}>
          {selectedLeadKeys.count() > 0 && (<LeadUpdateMultipleBox {...this.props}/>)}
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

export default injectIntl(LeadsTableBox)