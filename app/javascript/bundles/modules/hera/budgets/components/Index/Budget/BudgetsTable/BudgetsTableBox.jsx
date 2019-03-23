import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'

import {
  Form, Table, Button, Popconfirm, Input, Row, Col, Pagination,
  Tag, Tabs, Badge, Select, Modal
} from 'antd'
import { DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_BUTTON_ITEM_LAYOUT, DEFAULT_FORM_TAIL_LAYOUT } from 'app/constants/form'
import {
  getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
  getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch,
} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { BUDGETS_URL } from '../../../../constants/paths'
import { selectFilterOption } from 'helpers/antdHelper'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const { Search } = Input
const Option = Select.Option

class BudgetsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.date_create.label'}),
      dataIndex: 'created_at',
      key: 'date_create',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: intl.formatMessage({id: 'attrs.email.label'}),
      dataIndex: 'staff_email',
      key: 'staff'
    }, {
      title: intl.formatMessage({id: 'attrs.budget.label'}),
      dataIndex: 'budget',
      key: 'budget',
    }, {
      title: intl.formatMessage({id: 'attrs.used_domain.label'}),
      dataIndex: 'used_domain',
      key: 'used_domain',
    },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="edit"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={() => this.handleDelete(row.id)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
              <Button
                icon="delete"
                size="small"
                className="button-margin--top--default width--full"
                type="danger"
                loading={row.isDeleting}
              >
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
          </div>
        )
      },
    }];
  }

  handleDelete(budgetId) {
    const {actions, indexState} = this.props
    actions.deleteBudget(budgetId)
  }

  handleEdit(budgetId) {
    browserHistory.push(`${BUDGETS_URL}/${budgetId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${BUDGETS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let budgetParams = getFilterParams(indexState.get('budgetFilters'))
    const {current, pageSize, total} = pagination

    if(current != budgetParams.page) {
      budgetParams.page = current
    }

    actions.fetchBudgets(budgetParams)
  }

  handleSearch(keyword) {
    keyword = removeSpaceInput(keyword)
    if (keyword) {
      const {actions, indexState} = this.props
      let budgetParams = getFilterParams(indexState.get('budgetFilters'))
      actions.fetchBudgets(mergeDeep([budgetParams, {compconds: {'staff_email.like': `%${keyword}%`}}]))
    }
    const {actions, indexState} = this.props
    let budgetParams = getFilterParams(indexState.get('budgetFilters'))
    actions.fetchBudgets(mergeDeep([budgetParams, {compconds: {'staff_email.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState, form, intl, sharedState} = this.props
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
          <Col span={6}  className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder={intl.formatMessage({id: 'index.budget_table.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>

        <Table
          className="main-content-table-box-body"
          bordered
          size="middle"
          columns={this.columns}
          dataSource={budgets.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingBudgets}
        />
      </div>
    )
  }
}

export default injectIntl(BudgetsTableBox)