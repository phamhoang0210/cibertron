import React from 'react'
import { List } from 'immutable'
import _ from 'lodash'
import EditableTable from 'partials/components/Table/EditableTable/EditableTable'
import { getFilterParams } from 'helpers/applicationHelper'

class CampaignBydatesTableBox extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: 'C1',
      dataIndex: 'c1',
      key: 'c1',
    }, {
      title: 'C2',
      dataIndex: 'c2',
      key: 'c2',
    }, {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    }]

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleUpdate'
    ])
  }

  componentDidMount() {
    const {actions, campaign} = this.props
    const campaignBydates = campaign.get('campaignBydates')
    if(!campaignBydates) {
      actions.fetchCampaignBydates(campaign, { campaign_id: campaign.get('id') })
    }
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, campaign} = this.props
    let campaignBydateParams = getFilterParams(campaign.get('campaignBydateFilters'))
    const {current, pageSize, total} = pagination

    if(current != campaignBydateParams.page) {
      campaignBydateParams.page = current
    }

    actions.fetchCampaignBydates(campaign, campaignBydateParams)
  }

  handleDelete(id) {
    const {actions, campaign} = this.props
    actions.deleteCampaignBydate(campaign, id)
  }

  handleUpdate(id, data) {
    const {actions, campaign} = this.props
    actions.updateCampaignBydate(campaign, id, {record: data})
  }

  render() {
    const {campaign} = this.props
    const campaignBydates = (campaign.get('campaignBydates') || List([])).map(campaign => (
      campaign.merge({editableFields: ['c1', 'c2', 'cost']})
    ))
    const paging = campaign.getIn(['campaignBydateFilters', 'paging'])
    const isFetchingCampaignBydates = campaign.get('isFetchingCampaignBydates')

    return (
      <EditableTable
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
        style={{background: '#fff'}}
        columns={this.columns}
        dataSource={campaignBydates.toJS()}
        loading={isFetchingCampaignBydates}
        size="small"
        onChange={this.handleTableChange}
        rowKey="id"
        pagination={paging ? {
          total: paging.get('record_total'),
          current: paging.get('page'),
        } : {}}
      />
    )
  }
}

export default CampaignBydatesTableBox