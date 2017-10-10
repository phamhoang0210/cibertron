import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { AMUN_BASE_URL, SOURCES_EXPORT_API_PATH } from '../../../../constants/paths'
import { Table, Icon, Button, Popconfirm, Row, Col, Input} from 'antd'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'

const { Search } = Input

class SourcesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
      'handleExport',
    ])
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let sourceParams = getFilterParams(indexState.get('sourceFilters'))
    actions.fetchSources(mergeDeep([sourceParams, {compconds: {'source_url.like': `%${keyword}%`}}]))
  }

  handleExport() {
    const {actions, indexState} = this.props
    let sourceParams = getFilterParams(indexState.get('sourceFilters'))
    const query = qs.stringify({...sourceParams, ...getCredentials()}, { arrayFormat: 'brackets' })
    window.open(`${AMUN_BASE_URL}${SOURCES_EXPORT_API_PATH}?=${query}`, '_blank')
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
    const data = indexState.get('sources').toJS()

    const columns = [{
      title: 'Email',
      dataIndex: 'email',
    } , {
      title: 'Date',
      dataIndex: 'created_at',
    }, {
      title: 'Source',
      dataIndex: 'source_url',
    }];
    

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              placeholder="Search by url.."
              onSearch={this.handleSearch}
            />
          </Col>
          <Col span={18} className="main-content-table-box-tools-search-box">
            <Button type="primary" icon="download" size='default' onClick={this.handleExport}>Export</Button>
          </Col>
        </Row>
        <Table
          columns={columns} dataSource={data} size="big" 
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
