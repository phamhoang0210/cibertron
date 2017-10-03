import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col,
  Tag, Tabs, Badge,
} from 'antd'
import { getFilterParams, mergeDeep, rowClassName } from 'helpers/applicationHelper'
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

    this.state = {
      showImportModal: false,
    }

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
      'handleCreateOrder',
      'handleAssign',
      'handleUpdateAttrs'
    ])

    this.columns = [{
      title: 'Info',
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
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      width: '10%',
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
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: '15%',
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
      title: 'Assigned at',
      dataIndex: 'assigned_at',
      key: 'assigned_at',
      sorter: true,
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: 'Imported at',
      dataIndex: 'imported_at',
      key: 'imported_at',
      sorter: true,
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: 'Care status',
      dataIndex: 'care_status.code',
      key: 'care_status.code',
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
      title: 'Level',
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
      title: 'Staff',
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
      title: '',
      key: 'action',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              type="primary"
              style={{ width: '100%'}}
              onClick={(e) => this.handleCreateOrder(row.id)}
            >
              Create order
            </Button>
            <br/>
            <Button
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              Edit
            </Button>
            <br/>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this lead?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="button-margin--top--default"
                type="danger"
                loading={row.isDeleting}
                style={{ width: '100%' }}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      },
    }];
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
    const {actions, indexState} = this.props
    let leadParams = getFilterParams(indexState.get('leadFilters'))
    const {current, pageSize, total} = pagination

    if(current != leadParams.page) {
      leadParams.page = current
    }

    if(sorter.field) {
      leadParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }

    actions.fetchLeads(leadParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let leadParams = getFilterParams(indexState.get('leadFilters'))
    actions.fetchLeads(mergeDeep([leadParams, {compconds: {'email.like': `%${keyword}%`}}]))
  }

  handleAssign() {
    browserHistory.push(`${LEADS_URL}/assign`)
  }

  handleUpdateAttrs(id, values) {
    const {actions} = this.props
    actions.updateLeadAttrs(id, {fields: 'lead_level{},care_status{}', record: values})
  }

  render() {
    const {indexState, actions} = this.props
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
              Add
            </Button>
            <Button
              className="button-margin--left--default"
              onClick={(e) => this.setState({showImportModal: true})}
            >
              Import
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
              Assign
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by email.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={leads.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowClassName={rowClassName}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingLeads}
          expandedRowRender={record => {
            const lead = Immutable.fromJS(record)
            const orderCount = lead.getIn(['orderFilters', 'paging', 'record_total'])
            const emailLeadCount = lead.getIn(['emailLeadFilters', 'paging', 'record_total'])
            return (
              <Tabs defaultActiveKey="email_leads" style={{background: '#fff'}}>
                <TabPane tab={`Email Logs (${typeof emailLeadCount != "undefined" ? emailLeadCount : '..'})`} key="email_leads">
                  <EmailLeadsTableBox
                    lead={lead}
                    actions={actions}
                  />
                </TabPane>
                <TabPane tab={`Order (${typeof orderCount != "undefined" ? orderCount : '..'})`} key="orders">
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
}

export default LeadsTableBox