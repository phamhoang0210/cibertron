import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { DOMAINS_URL } from '../../../../constants/paths'

const { Search } = Input

class DomainsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Domain',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Landing page name',
      dataIndex: 'landing_page.name',
      key: 'landing_page_name',
    }, {
      title: '',
      key: 'action',
      width: 100,
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Button
              icon="edit"
              size="small"
              className="width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              Edit
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this domain?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon="delete"
                size="small"
                className="button-margin--top--default width--full"
                type="danger"
                loading={row.isDeleting}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      },
    }];
  }

  handleDelete(domainId) {
    const {actions, indexState} = this.props
    actions.deleteDomain(domainId)
  }

  handleEdit(domainId) {
    browserHistory.push(`${DOMAINS_URL}/${domainId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${DOMAINS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let domainParams = getFilterParams(indexState.get('domainFilters'))
    const {current, pageSize, total} = pagination

    if(current != domainParams.page) {
      domainParams.page = current
    }

    actions.fetchDomains(domainParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let domainParams = getFilterParams(indexState.get('domainFilters'))
    actions.fetchDomains(mergeDeep([domainParams, {compconds: {'name.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState} = this.props
    const domains = indexState.get('domains')
    const paging = indexState.getIn(['domainFilters', 'paging'])
    const isFetchingDomains = indexState.get('isFetchingDomains')

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
          <Col span={6}  className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by code.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={domains.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingDomains}
        />
      </div>
    )
  }
}

export default DomainsTableBox