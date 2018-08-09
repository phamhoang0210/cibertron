import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../../constants/paths'
import { Badge, Menu, Dropdown } from 'antd';

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let campaignParams = getFilterParams(indexState.get('campaignFilters'))
    const {current, pageSize, total} = pagination

    if(current != campaignParams.page) {
      campaignParams.page = current
    }

    actions.fetchCampaigns(campaignParams)
  }

  render() {
    const {indexState} = this.props
    const campaigns = indexState.get('campaigns')
    const paging = indexState.getIn(['campaignFilters', 'paging'])
    const isFetchingCampaigns = indexState.get('isFetchingCampaigns')
    const data = indexState.get('campaigns').toJS()
    const columns = [
      {title: 'Name', dataIndex: 'name', key: 'name'}, 
      {title: 'Type', dataIndex: 'campaign_type', key: 'campaign_type'},
      {title: 'Target', dataIndex: 'target_id', key: 'target_id'},
      {title: 'Date', dataIndex: 'created_at', key: 'created_at'}
    ]

    const expandedRowRender = (record) => {
      
    };

    return (
      <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={data}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          onChange={this.handleTableChange}
          loading={isFetchingCampaigns}
          rowKey="id"
        />
    );
  }

}
export default CampaignsTableBox