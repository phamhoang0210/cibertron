import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import {
  Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal
} from 'antd'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { SENDERS_URL } from '../../../../constants/paths'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input

class BudgetsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    // this.initialValues = this.getInitialValues()

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
      },{
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        width: '25%',
        key: 'email'
      },{
        title: intl.formatMessage({id: 'attrs.budget.label'}),
        dataIndex: 'budget',
        key: 'budget'},
      {
        title: '',
        dataIndex: 'action',
        width: '10%',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Button
                type="primary"
                size="small"
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
                  size="small"
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

  // getInitialValues() {
  //   const {indexState, location} = this.props
  //   const currentBudgetFilters = Immutable.fromJS(getFilterParams(indexState.get('budgetFilters'), location))
  //   return {
  //     search: currentBudgetFilters.get('full_search'),
  //   }
  // }

  handleDelete(budgetId) {
    const {actions, indexState} = this.props
    actions.deleteBudget(budgetId)
  }

  handleEdit(budgetId) {
    // browserHistory.push(`${SENDERS_URL}/${budgetId}/edit`)
  }

  handleAdd(e) {
    // browserHistory.push(`${SENDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

    let budgetParams = {}
    if(current != budgetParams.page) {
      budgetParams.page = current
    }

    if(sorter.field) {
      budgetParams.orders = [`${sorter.field}.${FILTER_ORDER_MAPPINGS[sorter.order]}`]
    }


    budgetParams = getFilterParamsAndSyncUrl(indexState.get('budgetFilters'), location, budgetParams)

    actions.fetchBudgets(budgetParams)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let budgetParams = getFilterParamsAndSyncUrl(indexState.get('budgetFilters'), location, {full_search: keyword})
    actions.fetchBudgets(budgetParams)
  }

  render() {
    const {indexState, sharedState, actions, intl} = this.props
    const selectedBudgetKeys = indexState.get('selectedBudgetKeys')
    const budgets = indexState.get('budgets')
    const paging = indexState.getIn(['budgetFilters', 'paging'])
    const isFetchingBudgets = indexState.get('isFetchingBudgets')

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
          dataSource={budgets.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowClassName={rowClassName}
          rowKey="created_at"
          onChange={this.handleTableChange}
          loading={isFetchingBudgets}
        />
      </div>
    )
  }
}

export default injectIntl(BudgetsTableBox)