import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Tag } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { removeSpaceInput } from 'helpers/inputHelper'
import { browserHistory } from 'react-router'
import { DOMAINS_URL } from '../../../../constants/paths'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'
import { injectIntl } from 'react-intl'
import moment from 'moment'

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
      'handleReload',
      'handleRestore',
      'handleHistory'
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
          
          {row.backup && (<div><a href={`${intl.formatMessage({id: 'others.aws'})}/${row.name}/index.html`} target="_blank">
            <Tag style={{ marginTop: 5 }} color="volcano">{intl.formatMessage({id: 'attrs.backup_index.label'})}</Tag>
          </a>
          <a href={`${intl.formatMessage({id: 'others.aws'})}/${row.name}/thankyou/thankyou.html`} target="_blank">
            <Tag style={{ marginTop: 5 }} color="volcano">{intl.formatMessage({id: 'attrs.backup_thankyou.label'})}</Tag>
          </a></div>)}

        </div>
        ),
    }, {
      title: intl.formatMessage({id: 'attrs.username.label'}),
      dataIndex: 'username',
      key: 'username',
    }, {
      title: intl.formatMessage({id: 'attrs.platform.label'}),
      dataIndex: 'platform.title',
      key: 'platform.title',
    }, {
      title: intl.formatMessage({id: 'attrs.created_at.label'}),
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => value ? moment(value).format(LONG_DATETIME_FORMAT) : '',
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
              icon="reload"
              size="small"
              className="button-margin--top--default width--full"
              loading={row.isReloading}
              onClick={(e) => this.handleReload(row.id)}
            >
              Backup LDP
            </Button>
            <Button
              icon="restore"
              size="small"
              className="button-margin--top--default width--full"
              loading={row.isReloading}
              onClick={(e) => this.handleRestore(row.id)}
            >
              Restore
            </Button>
            <Button
              icon="edit"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleEdit(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.edit.text'})}
            </Button>
            <Button
              icon="calendar"
              size="small"
              className="button-margin--top--default width--full"
              onClick={(e) => this.handleHistory(row.id)}
            >
              {intl.formatMessage({id: 'form.form_item.button.history.text'})}
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

  handleHistory(domainId) {
     browserHistory.push(`${DOMAINS_URL}/${domainId}/history`)
  }

  handleAdd(e) {
    browserHistory.push(`${DOMAINS_URL}/new`)
  }

  handleReload(domainId){
    const {actions, indexState} = this.props
    // debugger
    // const paging = indexState.getIn(['domainFilters', 'paging'])
    // const domainParams = getFilterParams(indexState.get('landingPageFilters'))
    // const pagination = getDefaultTablePagination(paging.get('page'), paging.get('record_total'))
    // const {current, pageSize, total} = pagination

    // if(current != domainParams.page) {
    //   domainParams.page = current
    // }
    actions.reloadDomain(domainId)
  }

  handleRestore(domainId){
    browserHistory.push(`${DOMAINS_URL}/${domainId}/restore`)
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
    if (keyword) {
      const {actions, indexState} = this.props
      let domainParams = getFilterParams(indexState.get('domainFilters'))
      actions.fetchDomains(mergeDeep([domainParams, {compconds: {'name.like': `%${keyword}%`}}]))
    }
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
          bordered
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
