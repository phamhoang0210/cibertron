import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { NODES_URL } from '../../../../constants/paths'

class NodesTableBox extends React.Component {
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
      title: 'Worker',
      dataIndex: 'worker_id',
      key: 'worker',
      render: (text, record) => {
        if(text) {
          return (
            <span>
              <b>{record.worker_code}</b> {record.worker_type ? `(${record.worker_type})` : ''}
            </span>
          )
        }
      },
    }, {
      title: 'Product',
      dataIndex: 'product_id',
      key: 'product',
      render: (text, record) => {
        if(text) {
          return (
            <span>
              <b>{record.product_code}</b> {record.product_type ? `(${record.product_type})` : ''}
            </span>
          )
        }
      },
    }, {
      title: 'Channel code',
      dataIndex: 'channel.code',
      key: 'channel_code',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this node?"
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

  handleDelete(nodeId) {
    const {actions, indexState} = this.props
    actions.deleteNode(nodeId)
  }

  handleEdit(nodeId) {
    browserHistory.push(`${NODES_URL}/${nodeId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${NODES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let nodeParams = getFilterParams(indexState.get('nodeFilters'))
    const {current, pageSize, total} = pagination

    if(current != nodeParams.page) {
      nodeParams.page = current
    }

    actions.fetchNodes(nodeParams)
  }

  render() {
    const {indexState} = this.props
    const nodes = indexState.get('nodes')
    const paging = indexState.getIn(['nodeFilters', 'paging'])
    const isFetchingNodes = indexState.get('isFetchingNodes')

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
          dataSource={nodes.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingNodes}
        />
      </div>
    )
  }
}

export default NodesTableBox