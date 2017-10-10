import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CHANNELS_URL } from '../../../../constants/paths'

const { Search } = Input

class ChannelsTableBox extends React.Component {
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Provider',
      dataIndex: 'provider.name',
      key: 'provider_name',
    }, {
      title: 'Category',
      dataIndex: 'category.name',
      key: 'category_name',
    }, {
      title: '',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this channel?"
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

  handleDelete(channelId) {
    const {actions, indexState} = this.props
    actions.deleteChannel(channelId)
  }

  handleEdit(channelId) {
    browserHistory.push(`${CHANNELS_URL}/${channelId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${CHANNELS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let channelParams = getFilterParams(indexState.get('channelFilters'))
    const {current, pageSize, total} = pagination

    if(current != channelParams.page) {
      channelParams.page = current
    }

    actions.fetchChannels(channelParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let channelParams = getFilterParams(indexState.get('channelFilters'))
    actions.fetchChannels(mergeDeep([channelParams, {compconds: {'code.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState} = this.props
    const channels = indexState.get('channels')
    const paging = indexState.getIn(['channelFilters', 'paging'])
    const isFetchingChannels = indexState.get('isFetchingChannels')

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
          <Col span={6}  className="main-content-table-box-tools-search-box">
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
          dataSource={channels.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingChannels}
        />
      </div>
    )
  }
}

export default ChannelsTableBox