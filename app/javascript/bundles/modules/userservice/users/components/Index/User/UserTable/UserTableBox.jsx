import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParamsAndSyncUrl, getFilterParams, getDefaultTablePagination, getInitialValueForSearch } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { USERS_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const Search = Input.Search


class UserTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleEdit',
      'handleAdd',
      'handleSearch'
    ])

    this.initialValues = this.getInitialValues()
    const {intl} = this.props

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'full_name',
      key: 'full_name',
    }, {
      title: intl.formatMessage({id: 'attrs.email.label'}),
      dataIndex: 'basic_profile.email',
      key: 'email',
    }, {
      title: intl.formatMessage({id: 'attrs.mobile.label'}),
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
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
          </div>
        )
      },
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentUserFilters = Immutable.fromJS(getFilterParams(indexState.get('userFilters'), location))
    return {
      search: getInitialValueForSearch({}, currentUserFilters, ['username.like']),
    }
  }

  handleEdit(userId) {
    browserHistory.push(`${USERS_URL}/${userId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${USERS_URL}/new`)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let userParams = getFilterParamsAndSyncUrl(indexState.get('userFilters'), location, {compconds: {'username.like': `%${keyword}%`}})
    actions.fetchUsers(userParams)
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
    const {indexState, intl} = this.props
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
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              defaultValue={this.initialValues.search.initialValue}
              placeholder={intl.formatMessage({id: 'index.users_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
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

export default injectIntl(UserTableBox)