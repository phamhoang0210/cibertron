import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Tag } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { removeSpaceInput } from 'helpers/inputHelper'
import { browserHistory } from 'react-router'
import { DOMAINS_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class DomainsTableBox extends React.Component {
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
      render: (cell, row) => (
        <div>
        <a href={`http://${row.name}`} target="_blank">{row.name}</a><br/>
        {row.status == 'DELETED' && (<Tag style={{ marginTop: 5 }} color="red">DELETED</Tag>)}
        {row.status == 'PENDING' && (<Tag style={{ marginTop: 5 }} color="blue">PENDING</Tag>)}
        {row.status == 'ACTIVE' && (<Tag style={{ marginTop: 5 }} color="green">ACTIVE</Tag>)}
        </div>
        ),
    },{
      title: intl.formatMessage({id: 'attrs.username.label'}),
      dataIndex: 'username',
      key: 'username',
    }, {
      title: intl.formatMessage({id: 'attrs.dns_server.label'}),
      dataIndex: 'dns_server',
      key: 'dns_server',
    }, {
      title: intl.formatMessage({id: 'attrs.landing_page_name.label'}),
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
    keyword = removeSpaceInput(keyword)
    const {actions, indexState} = this.props
    let domainParams = getFilterParams(indexState.get('domainFilters'))
    actions.fetchDomains(mergeDeep([domainParams, {compconds: {'name.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState, intl} = this.props
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
              {intl.formatMessage({id: 'form.form_item.button.add.text'})}
            </Button>
          </Col>
          <Col span={6}  className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder={intl.formatMessage({id: 'index.domains_table.search.placeholder'})}
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

export default injectIntl(DomainsTableBox)