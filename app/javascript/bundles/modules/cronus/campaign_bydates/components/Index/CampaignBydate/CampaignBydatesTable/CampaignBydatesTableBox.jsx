import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGN_BYDATESS_URL } from '../../../../constants/paths'

class CampaignBydatesTableBox extends React.Component {
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Campaign',
      dataIndex: 'campaign.name',
      key: 'campaign_name',
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
              title="Are you sure delete this campaignBydate?"
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

  handleDelete(campaignBydateId) {
    const {actions, indexState} = this.props
    actions.deleteCampaignBydate(campaignBydateId)
  }

  handleEdit(campaignBydateId) {
    browserHistory.push(`${CAMPAIGN_BYDATESS_URL}/${campaignBydateId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${CAMPAIGN_BYDATESS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let campaignBydateParams = getFilterParams(indexState.get('campaignBydateFilters'))
    const {current, pageSize, total} = pagination

    if(current != campaignBydateParams.page) {
      campaignBydateParams.page = current
    }

    actions.fetchCampaignBydates(campaignBydateParams)
  }

  render() {
    const {indexState} = this.props
    const campaignBydates = indexState.get('campaignBydates')
    const paging = indexState.getIn(['campaignBydateFilters', 'paging'])
    const isFetchingCampaignBydates = indexState.get('isFetchingCampaignBydates')

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
          dataSource={campaignBydates.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingCampaignBydates}
        />
      </div>
    )
  }
}

export default CampaignBydatesTableBox