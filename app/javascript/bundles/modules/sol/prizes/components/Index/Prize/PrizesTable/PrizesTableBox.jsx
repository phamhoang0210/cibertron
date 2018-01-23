import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { Table, Icon, Button, Popconfirm, Row, Col, Input} from 'antd'
import { PRIZES_URL} from '../../../../constants/paths'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment'

const { Search } = Input

class PrizesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
      'handleAdd',
      'handleEdit',
      'handleDelete',
    ])
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let prizeParams = getFilterParams(indexState.get('prizeFilters'))
    actions.fetchPrizes(mergeDeep([prizeParams, {compconds: {'name.like': `%${keyword}%`}}]))
  }
  handleAdd(e) {
    browserHistory.push(`${PRIZES_URL}/new`)
  }
  handleDelete(prizeId) {
    const {actions, indexState} = this.props
    actions.deletePrize(prizeId)
  }

  handleEdit(prizeId) {
    browserHistory.push(`${PRIZES_URL}/${prizeId}/edit`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let prizeParams = getFilterParams(indexState.get('prizeFilters'))
    const {current, pageSize, total} = pagination

    if(current != prizeParams.page) {
      prizeParams.page = current
    }

    actions.fetchPrizes(prizeParams)
  }

  render() {
    const {indexState} = this.props
    const paging = indexState.getIn(['prizeFilters', 'paging'])
    const isFetchingPrizes = indexState.get('isFetchingPrizes')
    const data = indexState.get('prizes').toJS()

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    } , {
      title: 'Date',
      dataIndex: 'created_at',
      render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this prize?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
            <Button
              className="button-margin--left--default"
              onClick={(e) => this.handleEdit(row.id)}
            >
              Edit
            </Button>
          </div>
        )
      },
    }];
    

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
              enterButton
              placeholder="Search by name.."
              onSearch={this.handleSearch}
            />
          </Col>
          <Col span={18} className="main-content-table-box-tools-search-box">
            <Button type="primary" icon="plus" size='default' onClick={this.handleAdd}>Create</Button>
          </Col>
        </Row>
        <Table 
          columns={columns} dataSource={data} size="big" 
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          onChange={this.handleTableChange}
          loading={isFetchingPrizes}
          rowKey="id"
        />
      </div>
    );
  }

}
export default PrizesTableBox
