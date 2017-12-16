import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, getFilterParamsAndSyncUrl, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { ROLES_URL } from '../../../../constants/paths'

const { Search } = Input

class RoleTableBox extends React.Component {
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
      title: intl.formatMessage({id: 'attrs.level.label'}),
      dataIndex: 'level',
      key: 'level',
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
              <Button icon="delete" type="danger" loading={row.isDeleting}>
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              icon="edit"
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
    const currentDeaprtmentFilters = Immutable.fromJS(getFilterParams(indexState.get('roleFilters'), location))
    return {
      search: currentDeaprtmentFilters.get('full_search'),
    }
  }

  handleDelete(roleId) {
    const {actions, indexState} = this.props
    actions.deleteRole(roleId)
  }

  handleEdit(roleId) {
    browserHistory.push(`${ROLES_URL}/${roleId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${ROLES_URL}/new`)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let roleParams = getFilterParamsAndSyncUrl(indexState.get('roleFilters'), location, {full_search: keyword})
    actions.fetchRoles(roleParams)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

   let roleParams = getFilterParamsAndSyncUrl(indexState.get('roleFilters'), location, {page: current})
    actions.fetchRoles(roleParams)
  }

  render() {
    const {indexState, intl} = this.props
    const roles = indexState.get('roles')
    const paging = indexState.getIn(['roleFilters', 'paging'])
    const isFetchingRoles = indexState.get('isFetchingRoles')

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
              enterButton
              defaultValue={this.initialValues.search}
              placeholder={intl.formatMessage({id: 'index.roles_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={roles.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingRoles}
        />
      </div>
    )
  }
}

export default RoleTableBox