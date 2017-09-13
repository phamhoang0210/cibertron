import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CHANNELS_URL } from '../../../../constants/paths'

class ChannelTableBox extends React.Component {
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
      title: 'Provider',
      dataIndex: 'provider.name',
      key: 'provider_name',
    }, {
      title: 'Category',
      dataIndex: 'category.name',
      key: 'category_name',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this channel?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">
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

  render() {
    const {indexState} = this.props
    const channels = indexState.get('channels')
    const paging = indexState.getIn(['channelFilters', 'paging'])
    const isFetchingChannels = indexState.get('isFetchingChannels')

    return (
      <div style={{marginTop: '8px'}}>
        <Button
          style={{marginBottom: '8px'}}
          onClick={this.handleAdd}
        >
          Add
        </Button>
        <Table
          columns={this.columns}
          dataSource={channels.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingChannels}
        />
      </div>
    )
  }
}

export default ChannelTableBox