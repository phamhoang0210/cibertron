import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParamsAndSyncUrl, getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ACCOUNTS_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const Search = Input.Search

class AccountTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.initialValues = this.getInitialValues()

    const {intl} = this.props

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: intl.formatMessage({id: 'attrs.email.label'}),
      dataIndex: 'email',
      key: 'email',
    }, {
      title: intl.formatMessage({id: 'attrs.role.label'}),
      dataIndex: 'role.name',
      key: 'role_name',
    }, {
      title: intl.formatMessage({id: 'attrs.adminrole.label'}),
      dataIndex: 'adminrole.name',
      key: 'adminrole_name',
    }, {
      title: intl.formatMessage({id: 'attrs.department.label'}),
      dataIndex: 'department.name',
      key: 'department_name',
    }, {
      title: intl.formatMessage({id: 'attrs.company.label'}),
      dataIndex: 'company.name',
      key: 'company_name',
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      key: 'actions',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={() => this.handleDelete(row.id)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
              <Button type="danger" loading={row.isDeleting} icon="delete">
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
            <Button
              className="button-margin--left--default"
              onClick={(e) => this.handleEdit(row.id)}
              icon="edit"
              type="primary"
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
    const currentAccountFilters = Immutable.fromJS(getFilterParams(indexState.get('accountFilters'), location))
    return {
      search: currentAccountFilters.get('full_search'),
    }
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
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination
    
    let accountParams = getFilterParamsAndSyncUrl(indexState.get('accountFilters'), location, {page: current})
    actions.fetchAccounts(accountParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let accountParams = getFilterParamsAndSyncUrl(indexState.get('accountFilters'), location, {full_search: keyword})
    actions.fetchAccounts(accountParams)
  }

  render() {
    const {indexState, intl} = this.props
    const accounts = indexState.get('accounts')
    const paging = indexState.getIn(['accountFilters', 'paging'])
    const isFetchingAccounts = indexState.get('isFetchingAccounts')

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
              defaultValue={this.initialValues.search}
              placeholder={intl.formatMessage({id: 'index.accounts_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={accounts.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingAccounts}
        />
      </div>
    )
  }
}

export default injectIntl(AccountTableBox)