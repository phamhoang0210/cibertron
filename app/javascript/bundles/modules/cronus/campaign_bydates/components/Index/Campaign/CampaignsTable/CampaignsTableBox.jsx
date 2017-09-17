import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Col, Row, Input } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGN_BYDATES_URL } from '../../../../constants/paths'
import CampaignBydatesTableBox from './CampaignBydate/CampaignBydatesTable/CampaignBydatesTableBox'
import CampaignBydateAddModalBox from './CampaignBydate/CampaignBydateAddModal/CampaignBydateAddModalBox'
import CampaignBydateImportModalBox from './CampaignBydate/CampaignBydateImportModal/CampaignBydateImportModalBox'

const { Search } = Input

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    _.bindAll(this, [
      'handleTableChange',
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
      title: 'Node',
      dataIndex: 'node.code',
      key: 'node_code',
    }];
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

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let campaignParams = getFilterParams(indexState.get('campaignFilters'))
    actions.fetchCampaigns({...campaignParams, 'compconds[code.like]': `%${keyword}%`})
  }

  render() {
    const {indexState, actions} = this.props
    const campaigns = indexState.get('campaigns')
    const paging = indexState.getIn(['campaignFilters', 'paging'])
    const isFetchingCampaigns = indexState.get('isFetchingCampaigns')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
            <Button onClick={(e) => this.setState({showAddModal: true})}>Add</Button>
            <CampaignBydateAddModalBox
              {...this.props}
              visible={this.state.showAddModal}
              handleCancel={() => this.setState({showAddModal: false})}
            />
            <Button
              style={{marginLeft: '4px'}}
              onClick={(e) => this.setState({showImportModal: true})}
            >
              Import
            </Button>
            <CampaignBydateImportModalBox
              {...this.props}
              visible={this.state.showImportModal}
              handleCancel={() => this.setState({showImportModal: false})}
            />
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              placeholder="Search campaign by code.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={campaigns.toJS()}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingCampaigns}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          expandedRowRender={record => (
            <CampaignBydatesTableBox
              campaign={Immutable.fromJS(record)}
              actions={actions}
            />
          )}
        />
      </div>
    )
  }
}

export default CampaignsTableBox