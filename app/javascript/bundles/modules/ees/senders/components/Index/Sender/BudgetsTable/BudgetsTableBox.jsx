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
import { SENDERS_URL } from '../../../../constants/paths'
import { selectFilterOption } from 'helpers/antdHelper'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import { FILTER_ORDER_MAPPINGS } from 'app/constants/table'
import moment from 'moment'

import { injectIntl } from 'react-intl'

const { Search } = Input
const FormItem = Form.Item
const Option = Select.Option

class BudgetsTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    //this.initialValues = this.getInitialValues()
    this.state = {
      showImportBudgetModal: false,
      showEditBudgetModal: false,
      id: 0,
      budgetvalue: 0,
    }
    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleShowEditModal',
      'handleAdd',
      'handleSearch',
      'handleCancel',
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
        key: 'budget'
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
                size="small"
                icon="edit"
                className="button-margin--left--default"
                onClick={(e) => this.handleShowEditModal(row.id,row.budget)}
              >
              </Button>
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
                onConfirm={(e) => this.handleDelete(row.id)}
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
  handleShowModal(){

  }
  handleShowEditModal(budgetId,budget) {
    this.setState({
      id: budgetId,
      budgetvalue: budget,
      showEditBudgetModal: true
    })

  }
  handleDelete(budgetId) {
    const {actions, indexState} = this.props
    actions.deleteBudget(budgetId)
  }

  handleEdit(e) {
    e.preventDefault()
    const {actions,form} = this.props
    this.setState({showEditBudgetModal: false, budgetvalue: 0})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var budgetId = values.id
        var params = {budget: values.budget}
        actions.updateBudget(budgetId,{record: params})
      }
    })
    form.resetFields()
  }

  handleAdd(e) {
    e.preventDefault()
    const {actions,form} = this.props
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        var params = {budget: values.budget, staff_id: values.staff_id.split('-')[0],email: values.staff_id.split('-')[1]}
        actions.createBudgets({record: params})
      }
    })
    this.setState({showImportBudgetModal: false})
    form.resetFields()

  }
  handleCancel() {
    const {form} = this.props
    this.setState({showImportBudgetModal: false,showEditBudgetModal: false, budget: 0})
    form.resetFields()
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
    const {indexState, form, sharedState, actions, intl} = this.props
    const selectedBudgetKeys = indexState.get('selectedBudgetKeys')
    const budgets = indexState.get('budgets')
    const users = sharedState.get('allusers')
    const paging = indexState.getIn(['budgetFilters', 'paging'])
    const isFetchingBudgets = indexState.get('isFetchingBudgets')
    const { getFieldDecorator } = form

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={(e) => this.setState({showImportBudgetModal: true})}
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
        <Modal
          title="Import Budget"
          visible={this.state.showImportBudgetModal}
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
          okText="Import"
          cancelText="Close"
        >
          <Form layout="horizontal">
            <FormItem
              label={intl.formatMessage({id: 'attrs.staff_id.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}>
        
              {getFieldDecorator('staff_id')(
                <Select
                  showSearch
                  style={{ width: 160}}
                  filterOption={selectFilterOption}
                  placeholder="Nhân viên"
                  allowClear={true}
                >
                  {users.toJS().map(user => (
                    <Option value={`${user.id + '-' +user.username}`} key={user.id}>
                      {user.username}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'attrs.budget.label'})}
              {...DEFAULT_FORM_ITEM_LAYOUT}>
          {getFieldDecorator('budget',{initialValue:0})(
                <Input style={{ width: 160}} />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="Edit Budget"
          visible={this.state.showEditBudgetModal}
          onOk={this.handleEdit}
          onCancel={this.handleCancel}
          okText="Edit"
          cancelText="Close"
        >
            <Form layout="horizontal">
             <FormItem
                label={intl.formatMessage({id: 'attrs.budget.label'})}
                {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('budget',{initialValue: this.state.budgetvalue})(
                  <Input style={{ width: 160}}/>
                )}
              </FormItem>

              <FormItem
                {...DEFAULT_FORM_ITEM_LAYOUT}>
                  {getFieldDecorator('id',{initialValue: this.state.id})(
                  <Input style={{ display: 'none'}}  />
                )}
              </FormItem>
            </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(injectIntl(BudgetsTableBox))