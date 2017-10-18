import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { Table, Icon, Button, Popconfirm, Row, Col, Input} from 'antd'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment'

const { Search } = Input

class SourcesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
      'handleHandOver',
    ])
  }

  handleHandOver() {
    const {actions} = this.props
    actions.handOver()
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

  render() {
    const {indexState} = this.props
    const paging = indexState.getIn(['sourceFilters', 'paging'])
    const isFetchingSources = indexState.get('isFetchingSources')
    const isHandingOver = indexState.get('isHandingOver')
    const data = indexState.get('sources').toJS()

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
    }, {
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
          columns={columns}
          dataSource={data}
          size="middle" 
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          onChange={this.handleTableChange}
          loading={isFetchingSources}
          rowKey="id"
        />
      </div>
    );
  }

}
export default SourcesTableBox
