import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { IPPHONES_URL } from '../../../../constants/paths'
import { injectIntl } from 'react-intl'

const { Search } = Input

class IpphonesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd',
      'handleSearch',
    ])

    const {intl} = this.props

    this.columns = [{
      title: intl.formatMessage({id: 'attrs.id.label'}),
      dataIndex: 'id',
      key: 'id',
    }, {
      title: intl.formatMessage({id: 'attrs.user_id.label'}),
      dataIndex: 'user_id',
      key: 'user_id',
      render: value => this.props.sharedState.getIn(['userIdMappings', `${value}`, 'username'])
    }, {
      title: intl.formatMessage({id: 'attrs.station_id.label'}),
      dataIndex: 'station_id',
      key: 'station_id',
    }, {
      title: '',
      key: 'action',
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

  handleDelete(ipphoneId) {
    const {actions, indexState} = this.props
    actions.deleteIpphone(ipphoneId)
  }

  handleEdit(ipphoneId) {
    browserHistory.push(`${IPPHONES_URL}/${ipphoneId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${IPPHONES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let ipphoneParams = getFilterParams(indexState.get('ipphoneFilters'))
    const {current, pageSize, total} = pagination

    if(current != ipphoneParams.page) {
      ipphoneParams.page = current
    }

    actions.fetchIpphones(ipphoneParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let ipphoneParams = getFilterParams(indexState.get('ipphoneFilters'))
    actions.fetchIpphones(mergeDeep([ipphoneParams, {compconds: {'station_id.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState, intl} = this.props
    const ipphones = indexState.get('ipphones')
    const paging = indexState.getIn(['ipphoneFilters', 'paging'])
    const isFetchingIpphones = indexState.get('isFetchingIpphones')

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
              placeholder={intl.formatMessage({id: 'index.ipphones_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={ipphones.toJS()}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingIpphones}
        />
      </div>
    )
  }
}

export default injectIntl(IpphonesTableBox)