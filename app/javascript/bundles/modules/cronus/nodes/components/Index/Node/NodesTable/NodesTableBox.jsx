import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { NODES_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class NodesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.code.label'}),
      dataIndex: 'code',
      key: 'code',
    }, {
      title: intl.formatMessage({id: 'attrs.worker.label'}),
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
      title: intl.formatMessage({id: 'attrs.product.label'}),
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
      title: intl.formatMessage({id: 'attrs.channel_code.label'}),
      dataIndex: 'channel.code',
      key: 'channel_code',
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      key: 'action',
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
              <Button type="danger" loading={row.isDeleting}>
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})},
              </Button>
            </Popconfirm>
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
    const {indexState, intl} = this.props
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
              enterButton
              placeholder={intl.formatMessage({id: 'index.nodes_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={nodes.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingNodes}
        />
      </div>
    )
  }
}

export default injectIntl(NodesTableBox)