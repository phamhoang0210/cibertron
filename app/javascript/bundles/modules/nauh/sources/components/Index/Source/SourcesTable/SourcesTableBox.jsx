import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Pagination, Spin} from 'antd'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination, getDefaultTableTitlePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import SelectEditable from 'partials/components/ContentEditable/Select/SelectEditable'
import moment from 'moment'
import { injectIntl } from 'react-intl'

const { Search } = Input

class SourcesTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
      'handleHandOver',
      'handleSetToTest',
      'handleSetToTrash',
      'handleSetToNew',
      'renderTableTitle',
      'handleSelectionChange',
      'handleClearSelection',
    ])

    this.columns = [{
      title: intl.formatMessage({id: 'index.sources_table.headers.email.title'}),
      dataIndex: 'email',
    }, {
      title: intl.formatMessage({id: 'index.sources_table.headers.created_at.title'}),
      dataIndex: 'created_at',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: intl.formatMessage({id: 'index.sources_table.headers.status.title'}),
      dataIndex: 'status',
    }, {
      width: 48,
      title: intl.formatMessage({id: 'index.sources_table.headers.l8_count.title'}),
      dataIndex: 'l8_count',
      render: value => (value == 'loading') ? (<Spin indicator={(<Icon type="loading" style={{ fontSize: 12 }} spin />)} />) : value,
    },{
      title: intl.formatMessage({id: 'index.sources_table.headers.interest.title'}),
      dataIndex: 'interest',
      render: (value, record) => (
          <div>
          <span>{`• ${record.interest}`}</span><br/>
          {record.note && (<span>{`• ${record.note}`}</span>)}
        </div>
        )
    }, {
      title: intl.formatMessage({id: 'index.sources_table.headers.source_url.title'}),
      dataIndex: 'source_url',
      width: '50%',
    }];
  }

  handleHandOver() {
    const {actions, indexState} = this.props
    var selectedSourceKeys = indexState.get('selectedSourceKeys').toJS()
    actions.handOver({selected: selectedSourceKeys})
  }

  handleSetToTest() {
    const {actions, indexState} = this.props
    var selectedSourceKeys = indexState.get('selectedSourceKeys').toJS()
    actions.setToTest({selected: selectedSourceKeys})
  }

  handleSetToTrash() {
    const {actions, indexState} = this.props
    var selectedSourceKeys = indexState.get('selectedSourceKeys').toJS()
    actions.setToTrash({selected: selectedSourceKeys})
  }

  handleSetToNew() {
    const {actions, indexState} = this.props
    var selectedSourceKeys = indexState.get('selectedSourceKeys').toJS()
    actions.setToNew({selected: selectedSourceKeys})
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let sourceParams = getFilterParams(indexState.get('sourceFilters'))
    actions.fetchSources(mergeDeep([sourceParams, {full_search: keyword}]))
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let sourceParams = getFilterParams(indexState.get('sourceFilters'))
    const {current, pageSize, total} = pagination

    if(current != sourceParams.page) {
      sourceParams.page = current
    }

    actions.fetchSources(sourceParams)
  }

  handleSelectionChange(selectedRowKeys, selectedRows) {
    const {actions, indexState} = this.props
    actions.updateSelectedSourceKeys(selectedRowKeys)
  }

  handleClearSelection() {
    const {actions, indexState} = this.props
    actions.updateSelectedSourceKeys([])
  }

  render() {
    const {indexState, actions, intl} = this.props
    const paging = indexState.getIn(['sourceFilters', 'paging'])
    const isFetchingSources = indexState.get('isFetchingSources')
    const data = indexState.get('sources').toJS()
    const selectedSourceKeys = indexState.get('selectedSourceKeys')

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder= {intl.formatMessage({id: 'index.sources_table.tools.search.placeholder'})}
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          columns={this.columns}
          title={this.renderTableTitle}
          dataSource={data}
          rowSelection={{
            selectedRowKeys: selectedSourceKeys.toJS(),
            onChange: this.handleSelectionChange
          }}
          size="middle" 
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          onChange={this.handleTableChange}
          loading={isFetchingSources}
          rowKey="id"
        />
      </div>
    );
  }

  renderTableTitle() {
    const {indexState, actions, intl} = this.props
    const selectedSourceKeys = indexState.get('selectedSourceKeys')
    const paging = indexState.getIn(['sourceFilters', 'paging'])
    const isHandingOver = indexState.get('isHandingOver')

    return (
      <Row className="main-content-table-tools">
        <Col span={16}>
          {selectedSourceKeys.count() > 0 && (
            <Col>
            <b className="button-margin--right--default">
              {intl.formatMessage({id: 'index.sources_table.others.selected.label'})}
              {selectedSourceKeys.count()}
            </b>

            <Button
              className="button-margin--left--default"
              onClick={this.handleClearSelection}
            >
              {intl.formatMessage({id: 'index.sources_table.actions.clear.button'})}
            </Button>

            <Button
              className="button-margin--left--default"
              type="primary"
              ghost
              onClick={this.handleSetToTest}
            >
              {intl.formatMessage({id: 'index.sources_table.actions.move_to_test.button'})}
            </Button>

            <Button
              className="button-margin--left--default"
              type="primary"
              ghost
              onClick={this.handleSetToTrash}
            >
              {intl.formatMessage({id: 'index.sources_table.actions.move_to_trash.button'})}
            </Button>

            <Button
              className="button-margin--left--default"
              type="primary"
              ghost
              onClick={this.handleSetToNew}
            >
              {intl.formatMessage({id: 'index.sources_table.actions.move_to_new.button'})}
            </Button>

            <Button
              className="button-margin--left--default"
              disabled={isHandingOver}
              loading={isHandingOver}
              onClick={this.handleHandOver}
              type="danger"
              ghost
            >
              {intl.formatMessage({id: 'index.sources_table.actions.hand_over.button'})}
            </Button>

            </Col>
            )}
        </Col>
        <Col span={8} className="main-content-table-tools-pagination-box">
          <Pagination
            size="small"
            onChange={(page, pageSize) => this.handleTableChange({current: page}, {}, {})}
            {...getDefaultTableTitlePagination(paging.get('page'), paging.get('record_total'))}
          />
        </Col>
      </Row>
    )
  }

}
export default injectIntl(SourcesTableBox)
