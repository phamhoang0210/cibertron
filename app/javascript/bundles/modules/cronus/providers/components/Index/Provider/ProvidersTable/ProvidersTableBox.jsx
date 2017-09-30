import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { PROVIDERS_URL } from '../../../../constants/paths'

const { Search } = Input

class ProvidersTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this provider?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
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

  handleDelete(providerId) {
    const {actions, indexState} = this.props
    actions.deleteProvider(providerId)
  }

  handleEdit(providerId) {
    browserHistory.push(`${PROVIDERS_URL}/${providerId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${PROVIDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let providerParams = getFilterParams(indexState.get('providerFilters'))
    const {current, pageSize, total} = pagination

    if(current != providerParams.page) {
      providerParams.page = current
    }

    actions.fetchProviders(providerParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let providerParams = getFilterParams(indexState.get('providerFilters'))
    actions.fetchProviders(mergeDeep([providerParams, {compconds: {'code.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState} = this.props
    const providers = indexState.get('providers')
    const paging = indexState.getIn(['providerFilters', 'paging'])
    const isFetchingProviders = indexState.get('isFetchingProviders')

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
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by code.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={providers.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingProviders}
        />
      </div>
    )
  }
}

export default ProvidersTableBox