import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { PROVIDERS_URL } from '../../../../constants/paths'

class ProvidersTableBox extends React.Component {
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
          <span>
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
            <Button style={{marginLeft: '4px'}} onClick={(e) => this.handleEdit(row.id)}>
              Edit
            </Button>
          </span>
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

  render() {
    const {indexState} = this.props
    const providers = indexState.get('providers')
    const paging = indexState.getIn(['providerFilters', 'paging'])
    const isFetchingProviders = indexState.get('isFetchingProviders')

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