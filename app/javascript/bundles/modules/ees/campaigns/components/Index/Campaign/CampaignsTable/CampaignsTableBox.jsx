import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal, Icon, Popover
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const TabPane = Tabs.TabPane
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ margin: 8 }} />
    {text}
  </span>
);
const content = (
  <div>
    <p><IconText type="check" text="Email Sent" /> </p>
    <p><IconText type="eye" text="Email Open" /></p>
    <p><IconText type="select" text="Click Link" /></p>
    <p><IconText type="dislike" text="Unsubscribe" /></p>
  </div>
);

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.initialValues = this.getInitialValues()

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch'
    ])

    this.columns = [
      {
        title: intl.formatMessage({id: 'attrs.created_in.label'}), 
        width: '10%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.name.label'}),
        dataIndex: 'name',
        key: 'name',
        render: (cell, row) => {
          return (
            <div>
              {row.status ? 
                (<Tag color="red">
                  SENT
                </Tag>) : (<Tag color="gray">
                  DRAFT
                </Tag>)
              }
              
              <b>{row.name}</b><br/>
              <Popover content={content}>
                {(<IconText type="check" text={(row.log_count || row.log_count >= 0)  ? row.log_count : (<Icon type="loading" />)} />)}
                {(<IconText type="eye" text={(row.open_count || row.open_count >= 0) ? row.open_count : (<Icon type="loading" />)} />)}
                <IconText type="select" text="0" />
                <IconText type="dislike" text="0" /><br/>
              </Popover>
            </div>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'attrs.last_action_by.label'}),
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: intl.formatMessage({id: 'attrs.creator.label'}),
        width: '10%',
        dataIndex: 'username', 
        key: 'user'
      },
      {
        title: '',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon="edit"
                className="button-margin--left--default"
                onClick={(e) => this.handleEdit(row.id)}
              >
              </Button>
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
                onConfirm={() => this.handleDelete(row.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button 
                  icon="delete" 
                  shape="circle"
                  disabled={row.status}
                  size="large"
                  type="danger" 
                  loading={row.isDeleting}
                  className="button-margin--left--default">
                </Button>
              </Popconfirm>
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
        
        {campaigns && (<Table
                          bordered
                          size="middle"
                          columns={this.columns}
                          dataSource={campaigns.toJS()}
                          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
                          rowClassName={rowClassName}
                          rowKey="id"
                          onChange={this.handleTableChange}
                          loading={isFetchingCampaigns}
                        />)}
      </div>
    )
  }
}

export default injectIntl(CampaignsTableBox)