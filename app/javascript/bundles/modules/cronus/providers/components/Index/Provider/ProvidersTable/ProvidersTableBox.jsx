import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { PROVIDERS_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class ProvidersTableBox extends React.Component {
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
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.name.label'}),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: intl.formatMessage({id: 'attrs.code.label'}),
      dataIndex: 'code',
      key: 'code',
    }, {
      title: intl.formatMessage({id: 'attrs.about.label'}),
      dataIndex: 'about',
      key: 'about',
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
              <Button type="danger" loading={row.isDeleting}>
                {intl.formatMessage({id: 'form.form_item.button.delete.text'})}
              </Button>
            </Popconfirm>
            <Button 
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

  handleDelete(providerId) {
    const {actions, indexState} = this.props
    actions.deleteProvider(providerId)
  }

  handleEdit(providerId) {
    browserHistory.push(`${PROVIDERS_URL}/${providerId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${PROVIDERS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let providerParams = getFilterParams(indexState.get('providerFilters'))
    const {current, pageSize, total} = pagination

    if(current != providerParams.page) {
      providerParams.page = current
    }

    actions.fetchProviders(providerParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let providerParams = getFilterParams(indexState.get('providerFilters'))
    actions.fetchProviders(mergeDeep([providerParams, {compconds: {'code.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState, intl} = this.props
    const providers = indexState.get('providers')
    const paging = indexState.getIn(['providerFilters', 'paging'])
    const isFetchingProviders = indexState.get('isFetchingProviders')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder={intl.formatMessage({id: 'index.providers_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={providers.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingProviders}
        />
      </div>
    )
  }
}

export default injectIntl(ProvidersTableBox)