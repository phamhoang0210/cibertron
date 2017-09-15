import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ACCOUNTS_URL } from '../../../../constants/paths'

class AccountTableBox extends React.Component {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Role',
      dataIndex: 'role.name',
      key: 'role_name',
    }, {
      title: 'Admin role',
      dataIndex: 'adminrole.name',
      key: 'adminrole_name',
    }, {
      title: 'Department',
      dataIndex: 'department.name',
      key: 'department_name',
    }, {
      title: 'Company',
      dataIndex: 'company.name',
      key: 'company_name',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this account?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">
                Delete
              </Button>
            </Popconfirm>
            <Button style={{marginLeft: '4px'}} onClick={(e) => this.handleEdit(row.id)}>
              Edit
            </Button>
          </span>
        )
      },
    }];
  }

  handleDelete(accountId) {
    const {actions, indexState} = this.props
    actions.deleteAccount(accountId)
  }

  handleEdit(accountId) {
    browserHistory.push(`${ACCOUNTS_URL}/${accountId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${ACCOUNTS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let accountParams = getFilterParams(indexState.get('accountFilters'))
    const {current, pageSize, total} = pagination

    if(current != accountParams.page) {
      accountParams.page = current
    }

    actions.fetchAccounts(accountParams)
  }

  render() {
    const {indexState} = this.props
    const accounts = indexState.get('accounts')
    const paging = indexState.getIn(['accountFilters', 'paging'])
    const isFetchingAccounts = indexState.get('isFetchingAccounts')

    return (
      <div style={{marginTop: '8px'}}>
        <Button
          style={{marginBottom: '8px'}}
          onClick={this.handleAdd}
        >
          Add
        </Button>
        <Table
          columns={this.columns}
          dataSource={accounts.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingAccounts}
        />
      </div>
    )
  }
}

export default AccountTableBox