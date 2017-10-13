import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import Immutable from 'immutable'
import {getCredentials} from 'helpers/auth/authHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox, Icon, Table, Popconfirm } from 'antd'
import { CATALOGS_URL} from '../../../../constants/paths'
import { getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
        getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'

const { Search } = Input
const Option = Select.Option
const FormItem = Form.Item
let uuid = 0;


class CatalogsTableBox extends React.Component {
  constructor(props) {
    super(props)
    this.initialValues = this.getInitialValues()
    _.bindAll(this, [
      'handleTableChange',
      'handleAdd',
      'handleSearch',
      'handleEdit',
      'handleDelete',
    ])
  }

  getInitialValues() {
    const {indexState, location} = this.props
    
    const currentCatalogFilters = Immutable.fromJS(getFilterParams(indexState.get('catalogFilters'), location))
    return {
      search: getInitialValueForSearch({}, currentCatalogFilters, ['code.like']),
    }
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let catalogParams = getFilterParamsAndSyncUrl(indexState.get('catalogFilters'), location, {compconds: {'code.like': `%${keyword}%`}})

    actions.fetchCatalogs(catalogParams)
  }
  handleAdd(e) {
    browserHistory.push(`${CATALOGS_URL}/new`)
  }
  handleDelete(catalogId) {
    const {actions, indexState} = this.props
    actions.deleteCatalog(catalogId)
  }

  handleEdit(catalogId) {
    browserHistory.push(`${CATALOGS_URL}/${catalogId}/edit`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    const {current, pageSize, total} = pagination

    let catalogParams = {}
    if(current != catalogParams.page) {
      catalogParams.page = current
    }
    catalogParams = getFilterParamsAndSyncUrl(indexState.get('catalogFilters'), location, catalogParams)

    actions.fetchCatalogs(catalogParams)
  }

  render() {
    const {actions, indexState, location} = this.props
    const catalogs = indexState.get('catalogs')
    const paging = indexState.getIn(['catalogFilters', 'paging'])
    const isFetchingCatalogs = indexState.get('isFetchingCatalogs')
    const dataCatalogs = indexState.get('catalogs').toJS()
    const columnsCatalogs = [
      {title: 'Name', dataIndex: 'name', key: 'name'},
      {title: 'Code', dataIndex: 'code', key: 'price'},
      {title: 'Action',
        dataIndex: 'action',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this catalog?"
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
    ]

    const expandedRowRender = (record) => {
      var catalog_courses = record.catalog_courses
      const data = [];
      for (let i = 0; i < catalog_courses.length; ++i) {
        data.push({
          id: i,
          name: catalog_courses[i].course.name,
          price: catalog_courses[i].course.price,
          new_price: catalog_courses[i].new_price
        });
      }

      const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Origin Price', dataIndex: 'price', key: 'price' },
        { title: 'New Price', dataIndex: 'new_price', key: 'new_price' },
      ];
      
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
        />
      );
    };

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={18}>
            <Button type="primary" ghost icon="plus" size='default' onClick={this.handleAdd}>New</Button>
          </Col>
          <Col span={6}>
            <Search
              defaultValue={this.initialValues.search.initialValue}
              placeholder="Search by code.."
              onSearch={this.handleSearch}
            />
          </Col>
          
        </Row>
        <Table
            size="middle"
            columns={columnsCatalogs}
            expandedRowRender={expandedRowRender}
            dataSource={dataCatalogs}
            pagination={{ total: paging.get('record_total'), current: paging.get('page'), }}
            onChange={this.handleTableChange}
            loading={isFetchingCatalogs}
            rowKey="id"
          />
      </div>
    );
  }

}
export default CatalogsTableBox
