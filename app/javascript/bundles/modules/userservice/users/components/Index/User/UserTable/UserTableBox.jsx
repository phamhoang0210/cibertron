import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col } from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { USERS_URL } from '../../../../constants/paths'

class UserTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleEdit',
      'handleAdd'
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    }, {
      title: 'Email',
      dataIndex: 'basic_profile.email',
      key: 'email',
    }, {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              className="button-margin--left--default"
              onClick={(e) => this.handleEdit(row.id)}
            >
              Edit
            </Button>
          </div>
        )
      },
    }];
  }

  handleEdit(userId) {
    browserHistory.push(`${USERS_URL}/${userId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${USERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let userParams = getFilterParams(indexState.get('userFilters'))
    const {current, pageSize, total} = pagination

    if(current != userParams.page) {
      userParams.page = current
    }

    actions.fetchUsers(userParams)
  }

  render() {
    const {indexState} = this.props
    const users = indexState.get('users')
    var data = []
    if(users) {
      data = users.toJS()
      _.forEach(data, function(user) {
        var first_name = user.first_name ? user.first_name : ''
        var last_name = user.last_name ? user.last_name : ''
        user['full_name'] = first_name + ' ' + last_name
      });
    }
    
    const paging = indexState.getIn(['userFilters', 'paging'])
    const isFetchingUsers = indexState.get('isFetchingUsers')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={data}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingUsers}
        />
      </div>
    )
  }
}

export default UserTableBox