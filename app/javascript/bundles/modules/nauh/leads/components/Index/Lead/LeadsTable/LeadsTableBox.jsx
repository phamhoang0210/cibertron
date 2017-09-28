import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Popconfirm, Input, Row, Col, Tag, Tabs } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LEADS_URL, ORDERS_URL } from '../../../../constants/paths'
import OrdersTableBox from './OrdersTable/OrdersTableBox'
import EmailLeadsTableBox from './EmailLeadsTable/EmailLeadsTableBox'
import LeadImportModalBox from './LeadImportModal/LeadImportModalBox'

const { Search } = Input
const TabPane = Tabs.TabPane
const LEVEL_COLOR_MAPPINGS = {
  'A0': 'orange',
  'A1': '#2db7f5',
  'A2': '#108ee9',
  'A3': '#87d068',
  'A3X': '#f50',
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
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Info',
      dataIndex: 'name',
      key: 'info',
      render: (value, record) => (
        <div>
          <b>{record.name}</b><br/>
          <span>{`• ${record.email}`}</span><br/>
          <span>{`• ${record.mobile}`}</span><br/>
        </div>
      )
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: 'Level',
      dataIndex: 'lead_level.name',
      key: 'lead_level_name',
      render: value => {
        if(value) {
          return (<Tag color={LEVEL_COLOR_MAPPINGS[value]}>{value}</Tag>)
        }
      }
    }, {
      title: 'Staff',
      dataIndex: 'staff_id',
      key: 'staff_id',
      render: value => {
        const {sharedState} = this.props
        const users = sharedState.get('users')
        const user = users.find(u => u.get('id') == value)
        return user ? user.get('username') : ''
      }
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this lead?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
            <Button style={{marginLeft: '4px'}} onClick={(e) => this.handleEdit(row.id)}>
              Edit
            </Button>
            <Button type="primary" style={{marginLeft: '4px'}} onClick={(e) => this.handleCreateOrder(row.id)}>
              Create order
            </Button>
          </span>
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

  render() {
    const {indexState, actions} = this.props
    const leads = indexState.get('leads')
    const paging = indexState.getIn(['leadFilters', 'paging'])
    const isFetchingLeads = indexState.get('isFetchingLeads')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              Add
            </Button>
            <Button
              style={{marginLeft: '4px'}}
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
              style={{marginLeft: '4px'}}
              onClick={this.handleAssign}
            >
              Assign
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              placeholder="Search by email.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={leads.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
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