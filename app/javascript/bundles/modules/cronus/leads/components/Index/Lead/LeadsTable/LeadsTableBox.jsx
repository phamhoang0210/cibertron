import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LEADS_URL } from '../../../../constants/paths'

class LeadsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd'
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'Node code',
      dataIndex: 'node.code',
      key: 'node_code',
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
            <Button className="button-margin--left--default" onClick={(e) => this.handleEdit(row.id)}>
              Edit
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

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let leadParams = getFilterParams(indexState.get('leadFilters'))
    const {current, pageSize, total} = pagination

    if(current != leadParams.page) {
      leadParams.page = current
    }

    actions.fetchLeads(leadParams)
  }

  render() {
    const {indexState} = this.props
    const leads = indexState.get('leads')
    const paging = indexState.getIn(['leadFilters', 'paging'])
    const isFetchingLeads = indexState.get('isFetchingLeads')

    return (
      <div style={{marginTop: '8px'}}>
        <Button
          style={{marginBottom: '8px'}}
          onClick={this.handleAdd}
        >
          Add
        </Button>
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
        />
      </div>
    )
  }
}

export default LeadsTableBox