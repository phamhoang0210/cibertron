import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col, Input } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CATEGORIES_URL } from '../../../../constants/paths'

const { Search } = Input

class CategoriesTableBox extends React.Component {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this category?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
            <Button style={{marginLeft: '4px'}} onClick={(e) => this.handleEdit(row.id)}>
              Edit
            </Button>
          </span>
        )
      },
    }];
  }

  handleDelete(categoryId) {
    const {actions, indexState} = this.props
    actions.deleteCategory(categoryId)
  }

  handleEdit(categoryId) {
    browserHistory.push(`${CATEGORIES_URL}/${categoryId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${CATEGORIES_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let categoryParams = getFilterParams(indexState.get('categoryFilters'))
    const {current, pageSize, total} = pagination

    if(current != categoryParams.page) {
      categoryParams.page = current
    }

    actions.fetchCategories(categoryParams)
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let categoryParams = getFilterParams(indexState.get('categoryFilters'))
    actions.fetchCategories(mergeDeep([categoryParams, {compconds: {'code.like': `%${keyword}%`}}]))
  }

  render() {
    const {indexState} = this.props
    const categories = indexState.get('categories')
    const paging = indexState.getIn(['categoryFilters', 'paging'])
    const isFetchingCategories = indexState.get('isFetchingCategories')

    return (
      <div style={{marginTop: '8px'}}>
        <Row style={{marginBottom: '8px'}}>
          <Col span={18}>
            <Button
              style={{marginBottom: '8px'}}
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              placeholder="Search by code.."
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={categories.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingCategories}
        />
      </div>
    )
  }
}

export default CategoriesTableBox