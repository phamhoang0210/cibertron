import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import Immutable from 'immutable'
import {getCredentials} from 'helpers/auth/authHelper'
import { Form, Input, Row, Col, Button, Select, Alert, Cascader, Checkbox, Icon, Table, Popconfirm } from 'antd'
import { GROUP_CATALOGS_URL} from '../../../../constants/paths'
import { getFilterParamsAndSyncUrl, mergeDeep, rowClassName, getDefaultTablePagination,
        getDefaultTableTitlePagination, getFilterParams, getInitialValueForSearch} from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import AlertBox from 'partials/components/Alert/AlertBox'

const { Search } = Input
const Option = Select.Option
const FormItem = Form.Item
let uuid = 0;


class GroupCatalogsTableBox extends React.Component {
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
    
    const currentGroupCatalogFilters = Immutable.fromJS(getFilterParams(indexState.get('groupCatalogFilters'), location))
    return {
      search: getInitialValueForSearch({}, currentGroupCatalogFilters, ['code.like']),
    }
  }

  handleSearch(keyword) {
    const {actions, indexState, location} = this.props
    let groupCatalogParams = getFilterParamsAndSyncUrl(indexState.get('groupCatalogFilters'), location, {compconds: {'code.like': `%${keyword}%`}})

    actions.fetchGroupCatalogs(groupCatalogParams)
  }
  handleAdd(e) {
    browserHistory.push(`${GROUP_CATALOGS_URL}/new`)
  }
  handleDelete(groupCatalogId) {
    const {actions, indexState} = this.props
    actions.deleteGroupCatalog(groupCatalogId)
  }

  handleEdit(groupCatalogId) {
    browserHistory.push(`${GROUP_CATALOGS_URL}/${groupCatalogId}/edit`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    const {current, pageSize, total} = pagination

    let groupCatalogParams = {}
    if(current != groupCatalogParams.page) {
      groupCatalogParams.page = current
    }
    groupCatalogParams = getFilterParamsAndSyncUrl(indexState.get('groupCatalogFilters'), location, groupCatalogParams)

    actions.fetchGroupCatalogs(groupCatalogParams)
  }

  render() {
    const {actions, indexState, location} = this.props
    const alert = indexState.get('alert')
    const groupCatalogs = indexState.get('groupCatalogs')
    const paging = indexState.getIn(['groupCatalogFilters', 'paging'])
    const isFetchingGroupCatalogs = indexState.get('isFetchingGroupCatalogs')
    const dataGroupCatalogs = indexState.get('groupCatalogs').toJS()
    const columnsGroupCatalogs = [
      {title: 'Name', dataIndex: 'name', key: 'name'},
      {title: 'Code', dataIndex: 'code', key: 'price'},
      {title: 'Action',
        dataIndex: 'action',
        render: (cell, row) => {
          return (
            <div className="text-align--right">
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this group catalog?"
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
      var group_catalogs = record.group_catalogs
      const data = [];
      for (let i = 0; i < group_catalogs.length; ++i) {
        data.push({
          id: i,
          name: group_catalogs[i].catalog.name,
          code: group_catalogs[i].catalog.code,
        });
      }

      const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Code', dataIndex: 'code', key: 'code' },
      ];
      
      return (
        <div className="main-content-form-box">
          {alert && !alert.isEmpty() && (
            <Row className="main-content-form-box-alert-box">
              <Col span={14}>
                <AlertBox
                  messages={alert.get('messages')}
                  type={alert.get('type')}
                />
              </Col>
            </Row>
          )}

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
          />
        </div>
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
              enterButton
              defaultValue={this.initialValues.search.initialValue}
              placeholder="Search by code.."
              onSearch={this.handleSearch}
            />
          </Col>
          
        </Row>
        <Table
            size="middle"
            columns={columnsGroupCatalogs}
            expandedRowRender={expandedRowRender}
            dataSource={dataGroupCatalogs}
            pagination={{ total: paging.get('record_total'), current: paging.get('page'), }}
            onChange={this.handleTableChange}
            loading={isFetchingGroupCatalogs}
            rowKey="id"
          />
      </div>
    );
  }

}
export default GroupCatalogsTableBox
