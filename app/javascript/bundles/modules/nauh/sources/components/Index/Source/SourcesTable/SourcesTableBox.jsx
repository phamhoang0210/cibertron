import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { Table, Icon, Button, Popconfirm, Row, Col, Input, Pagination} from 'antd'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination, getDefaultTableTitlePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import SelectEditable from 'partials/components/ContentEditable/Select/SelectEditable'
import moment from 'moment'

const { Search } = Input

class SourcesTableBox extends React.Component {
  constructor(props) {
    super(props)

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
    const {indexState, actions} = this.props
    const paging = indexState.getIn(['sourceFilters', 'paging'])
    const isFetchingSources = indexState.get('isFetchingSources')
    const isHandingOver = indexState.get('isHandingOver')
    const data = indexState.get('sources').toJS()
    const selectedSourceKeys = indexState.get('selectedSourceKeys')

    const columns = [{
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Date',
      dataIndex: 'created_at',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : '',
    }, {
      title: 'Status',
      dataIndex: 'status',
    },{
      title: 'Interest',
      dataIndex: 'interest',
    }
    , {
      title: 'Source',
      dataIndex: 'source_url',
      width: '50%',
    }];
    

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button
              disabled={isHandingOver}
              loading={isHandingOver}
              onClick={this.handleHandOver}
              type="primary"
              ghost
            >
              Hand over
            </Button>
          </Col>
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by url.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
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
    const {indexState, actions} = this.props
    const selectedSourceKeys = indexState.get('selectedSourceKeys')
    const paging = indexState.getIn(['sourceFilters', 'paging'])

    return (
      <Row className="main-content-table-tools">
        <Col span={16}>
          {selectedSourceKeys.count() > 0 && (
            <Col>
            <b className="button-margin--right--default">
              Selected: 
              {selectedSourceKeys.count()}
            </b>
            <Button
              className="button-margin--left--default"
              onClick={this.handleClearSelection}
            >
              Clear
            </Button>
            <Button
              className="button-margin--left--default"
              onClick={this.handleSetToTest}
            >
              Move to Test
            </Button>
            <Button
              className="button-margin--left--default"
              onClick={this.handleSetToTrash}
            >
              Move to Trash
            </Button>
            <Button
              className="button-margin--left--default"
              onClick={this.handleSetToNew}
            >
              Move to New
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
export default SourcesTableBox
