import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { NODES_URL } from '../../../../constants/paths'

const { Search } = Input

class NodesTableBox extends React.Component {
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
      title: '',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
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

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let nodeParams = getFilterParams(indexState.get('nodeFilters'))
    actions.fetchNodes(mergeDeep([nodeParams, {compconds: {'code.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState} = this.props
    const nodes = indexState.get('nodes')
    const paging = indexState.getIn(['nodeFilters', 'paging'])
    const isFetchingNodes = indexState.get('isFetchingNodes')

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
          <Col span={6} className="main-content-table-box-tools-box-search-box">
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