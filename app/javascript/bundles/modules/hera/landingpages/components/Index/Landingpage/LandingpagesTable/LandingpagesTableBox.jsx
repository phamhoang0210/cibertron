import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { LANDINGPAGES_URL } from '../../../../constants/paths'
import moment from 'moment'
import { LONG_DATETIME_FORMAT } from 'app/constants/datatime'

const { Search } = Input

class LandingpagesTableBox extends React.Component {
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
      title: 'Domain',
      dataIndex: 'full_domain',
      key: 'full_domain',
      render: (value, record) => (
        <div>
          <a target="_blank" href={`http://${value}`}>{value}</a><br/>
          type: {record.type}
        </div>
      ) 
    }, {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => moment(value).format(LONG_DATETIME_FORMAT),
    }, {
      title: 'Creator name',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'Course',
      dataIndex: 'coursesname',
      key: 'coursesname',
      render: (value, record) => (
        <div>
          <b>{value}</b>
          <br/>
          Id: <i>{record.coursesid}</i>
        </div>
      )
    }, {
      title: 'Strategy',
      dataIndex: 'strategy',
      key: 'strategy',
    }, {
      title: 'Price',
      dataIndex: 'old_price',
      key: 'old_price',
    }, {
      title: 'Promotion price',
      dataIndex: 'new_price',
      key: 'new_price',
      render: (value, record) => (
        <span>
          {value}
          <i> ({record.percent})</i>
        </span>
      )
    }, {
      title: '',
      key: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this landingpage?"
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
  }

  handleDelete(landingpageId) {
    const {actions, indexState} = this.props
    actions.deleteLandingpage(landingpageId)
  }

  handleEdit(landingpageId) {
    browserHistory.push(`${LANDINGPAGES_URL}/${landingpageId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${LANDINGPAGES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let landingpageParams = getFilterParams(indexState.get('landingpageFilters'))
    const {current, pageSize, total} = pagination

    if(current != landingpageParams.page) {
      landingpageParams.page = current
    }

    actions.fetchLandingpages(landingpageParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let landingpageParams = getFilterParams(indexState.get('landingpageFilters'))
    actions.fetchLandingpages(mergeDeep([landingpageParams, {full_search: keyword}]))
  }

  render() {
    const {indexState} = this.props
    const landingpages = indexState.get('landingpages')
    const paging = indexState.getIn(['landingpageFilters', 'paging'])
    const isFetchingLandingpages = indexState.get('isFetchingLandingpages')

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
              placeholder="Search by domain.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={landingpages.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingLandingpages}
        />
      </div>
    )
  }
}

export default LandingpagesTableBox