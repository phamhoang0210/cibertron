import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal, Icon, Popover, Progress,
  Alert
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
    <p><IconText type="check" text="Email Sent" /></p>
    <p><IconText type="eye" text="Email Open" /></p>
    <p><IconText type="star" text="Cost" /></p>
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
        width: '15%',
        dataIndex: 'created_at', 
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
      title: intl.formatMessage({id: 'attrs.open_percent.label'}),
      dataIndex: 'name',
      key: 'open',
      width: '7%',
      render: (cell, row) => {
        var amount = row.amount
        var opened = row.opened
        var status = ""
        var open_percent = 0
        if (row.amount > 0) {
          open_percent = _.round(opened/(amount/100),2)
        }

        if (open_percent >= 10) {
          status = "success"
        } else if (open_percent < 10) {
          status = "exception"
        }
        
        if (row.amount == 0) {
          return (
            <Progress width={60} status="active" type="circle" format={percent => `${'?'}`} />
          )
        } else {
          return (
            <Progress width={60} status={status} type="circle" percent={open_percent} format={percent => `${percent}`} />
          )
        }
        
      },
    },
      {
        title: intl.formatMessage({id: 'attrs.name.label'}),
        dataIndex: 'name',
        width: '50%',
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
                {row.amount != 0 && (<IconText type="check" text={(row.amount || row.amount >= 0)  ? row.amount : (<Icon type="loading" />)} />)}
                {row.amount != 0 && (<IconText type="eye" text={(row.opened || row.opened >= 0) ? row.opened : (<Icon type="loading" />)} />)}
                {row.amount != 0 && <IconText type="dislike" text={(row.unsubscribed || row.unsubscribed >= 0) ? row.unsubscribed : (<Icon type="loading" />)} />}
                {row.amount != 0 && (<IconText type="star" text={(row.amount || row.amount > 0)  ? _.round(row.amount*0.00045, 2) + '$' : (<Icon type="loading" />)} />)}
                <br/>
              </Popover>
            </div>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'attrs.last_action_by.label'}),
        dataIndex: 'updated_at',
        key: 'updated_at',
        width: '15%',
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
                icon="edit"
                className="width--full"
                size="small"
                onClick={(e) => this.handleEdit(row.id)}
              >
              </Button>

              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this campaign?"
                onConfirm={() => this.handleDelete(row.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="button-margin--top--default width--full"
                  icon="delete"
                  type="danger"
                  disabled={row.status}
                  size="small"
                  loading={row.isDeleting}
                >
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

    var personal_budget = sharedState.get('budget')
    var personal_used_emails = sharedState.get('used_emails')
    
    var used_emails = 1
    var budget = 1
    var percent = 100

    if (personal_budget && personal_used_emails) {
      used_emails = personal_used_emails.toJS().used_emails
      budget = personal_budget.toJS().budget
    }
    if (budget > 0) {
      percent = Math.round((used_emails/budget)*100)
    }

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
            <Search
              enterButton
              defaultValue={this.initialValues.search}
              placeholder="campaign"
              onSearch={this.handleSearch}
            />
            <Popover content={`EmailBudget: ${used_emails}/${budget}`}>
              <Progress percent={percent} status="active" />
            </Popover>
          </Col>
        </Row>
        <Row className="main-content-table-box-tools">
          <Alert message="Hệ thống Email đang trong quá trình nâng cấp. Sẽ tạm ngừng hoạt động trong một thời gian ngắn. Đội kỹ thuật sẽ thông báo khi hệ thống hoạt động trở lại" type="error" />
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