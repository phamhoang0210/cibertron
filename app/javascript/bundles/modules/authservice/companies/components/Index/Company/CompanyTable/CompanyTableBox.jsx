import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, getFilterParamsAndSyncUrl, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { COMPANIES_URL } from '../../../../constants/paths'

const { Search } = Input

class CompanyTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.initialValues = this.getInitialValues()

    const {intl} = this.props

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: intl.formatMessage({id: 'attrs.description.label'}),
      dataIndex: 'description',
      key: 'description',
    }, {
      title: intl.formatMessage({id: 'attrs.actions.label'}),
      key: 'actions',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={() => this.handleDelete(row.id)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
              <Button icon="delete" type="danger" loading={row.isDeleting}>
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              icon="edit"
              className="button-margin--left--default"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
          </div>
        )
      },
    }];
  }

  getInitialValues() {
    const {indexState, location} = this.props
    const currentDeaprtmentFilters = Immutable.fromJS(getFilterParams(indexState.get('companyFilters'), location))
    return {
      search: currentDeaprtmentFilters.get('full_search'),
    }
  }

  handleDelete(companyId) {
    const {actions, indexState} = this.props
    actions.deleteCompany(companyId)
  }

  handleEdit(companyId) {
    browserHistory.push(`${COMPANIES_URL}/${companyId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${COMPANIES_URL}/new`)
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let companyParams = getFilterParamsAndSyncUrl(indexState.get('companyFilters'), location, {full_search: keyword})
    actions.fetchCompanies(companyParams)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState, location} = this.props
    const {current, pageSize, total} = pagination

   let companyParams = getFilterParamsAndSyncUrl(indexState.get('companyFilters'), location, {page: current})
    actions.fetchCompanies(companyParams)
  }

  render() {
    const {indexState, intl} = this.props
    const companies = indexState.get('companies')
    const paging = indexState.getIn(['companyFilters', 'paging'])
    const isFetchingCompanies = indexState.get('isFetchingCompanies')

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
              placeholder={intl.formatMessage({id: 'index.companies_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={companies.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingCompanies}
        />
      </div>
    )
  }
}

export default CompanyTableBox