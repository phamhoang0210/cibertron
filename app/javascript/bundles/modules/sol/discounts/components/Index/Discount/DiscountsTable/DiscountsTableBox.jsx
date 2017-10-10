import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { Table, Icon, Button, Popconfirm, Row, Col, Input} from 'antd'
import { DISCOUNTS_URL} from '../../../../constants/paths'
import { getFilterParams, mergeDeep, rowClassName, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'

const { Search } = Input

class DiscountsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleSearch',
    ])
  }

  handleSearch(keyword) {
    const {actions, indexState} = this.props
    let discountParams = getFilterParams(indexState.get('discountFilters'))
    actions.fetchDiscounts(mergeDeep([discountParams, {compconds: {'name.like': `%${keyword}%`}}]))
  }
  handleAdd(e) {
    browserHistory.push(`${DISCOUNTS_URL}/new`)
  }
  handleDelete(discountId) {
    const {actions, indexState} = this.props
    actions.deleteDiscount(discountId)
  }

  handleEdit(discountId) {
    browserHistory.push(`${DISCOUNTS_URL}/${discountId}/edit`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let discountParams = getFilterParams(indexState.get('discountFilters'))
    const {current, pageSize, total} = pagination

    if(current != discountParams.page) {
      discountParams.page = current
    }

    actions.fetchDiscounts(discountParams)
  }

  render() {
    const {indexState} = this.props
    const paging = indexState.getIn(['discountFilters', 'paging'])
    const isFetchingDiscounts = indexState.get('isFetchingDiscounts')
    const data = indexState.get('discounts').toJS()

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    } , {
      title: 'Date',
      dataIndex: 'created_at',
    }, {
      title: 'Old price',
      dataIndex: 'old_price',
    } , 
    {
      title: 'New price',
      dataIndex: 'new_price',
    } , 
    {
      title: 'Reduce',
      dataIndex: 'reduce_percent',
    } ,
    {
      title: 'Type',
      dataIndex: 'product_type',
    } ,
    {
      title: 'Product',
      dataIndex: 'product_id',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (cell, row) => {
        return (
          <div className="text-align--right">
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this discount?"
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
    },
    ];
    

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={6} className="main-content-table-box-tools-search-box">
            <Search
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
          loading={isFetchingDiscounts}
          rowKey="id"
        />
      </div>
    );
  }

}
export default DiscountsTableBox
