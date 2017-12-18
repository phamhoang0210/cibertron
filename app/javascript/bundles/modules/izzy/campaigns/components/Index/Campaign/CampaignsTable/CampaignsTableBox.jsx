import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import { LEVEL_COLOR_MAPPINGS, BADGE_STATUS_MAPPINGS } from '../../../../constants/constants'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.state = {
      showImportModal: false,
    }

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [
      {
        title: 'Created', 
        width: '15%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',},
      {
        title: 'Name',
        width: '15%',
        dataIndex: 'name',
        key: 'name'},
      {
        title: 'Sender',
        width: '15%',
        dataIndex: 'sender.name', 
        key: 'sender'},
      {
        title: 'Last send',
        width: '15%',
        dataIndex: 'user_id', 
        key: 'last_send'},
      {
        title: 'Nguoi tao',
        width: '15%',
        dataIndex: 'user_id', 
        key: 'user'},
      {
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
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
      },
    ]
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentCampaignFilters = Immutable.fromJS(getFilterParams(indexState.get('campaignFilters'), location))
    return {
      search: currentCampaignFilters.get('full_search'),
    }
  }

  handleDelete(campaignId) {
    const {actions, indexState} = this.props
    actions.deleteCampaign(campaignId)
  }

  handleEdit(campaignId) {
    browserHistory.push(`${CAMPAIGNS_URL}/${campaignId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${CAMPAIGNS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let campaignParams = {}
    if(current != campaignParams.page) {
      campaignParams.page = current
    }

    if(sorter.field) {
      campaignParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    campaignParams = getFilterParamsAndSyncUrl(indexState.get('campaignFilters'), location, campaignParams)

    actions.fetchCampaigns(campaignParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let campaignParams = getFilterParamsAndSyncUrl(indexState.get('campaignFilters'), location, {full_search: keyword})
    actions.fetchCampaigns(campaignParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedCampaignKeys = indexState.get('selectedCampaignKeys')
    const campaigns = indexState.get('campaigns')
    const paging = indexState.getIn(['campaignFilters', 'paging'])
    const isFetchingCampaigns = indexState.get('isFetchingCampaigns')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
          </Col>
        </Row>
        <Table
          bordered
          size="middle"
          columns={this.columns}
          dataSource={campaigns.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingCampaigns}
        />
      </div>
    )
  }
}

export default injectIntl(CampaignsTableBox)