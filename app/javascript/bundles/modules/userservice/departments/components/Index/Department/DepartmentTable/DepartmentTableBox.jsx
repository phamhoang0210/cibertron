import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Row, Col } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { DEPARTMENTS_URL } from '../../../../constants/paths'

class DepartmentTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
      'handleDelete',
      'handleEdit',
      'handleAdd'
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Department',
      dataIndex: 'sup_department.name',
      key: 'sup_department_name',
    }, {
      title: 'Company',
      dataIndex: 'company.name',
      key: 'company_name',
    }, {
      title: 'Action',
      key: 'action',
      render: (cell, row) => {
        return (
          <span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure delete this department?"
              onConfirm={() => this.handleDelete(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" loading={row.isDeleting}>
                Delete
              </Button>
            </Popconfirm>
            <Button className="button-margin--left--default" onClick={(e) => this.handleEdit(row.id)}>
              Edit
            </Button>
          </span>
        )
      },
    }];
  }

  handleDelete(departmentId) {
    const {actions, indexState} = this.props
    actions.deleteDepartment(departmentId)
  }

  handleEdit(departmentId) {
    browserHistory.push(`${DEPARTMENTS_URL}/${departmentId}/edit`)
  }

  handleAdd(e) {
    browserHistory.push(`${DEPARTMENTS_URL}/new`)
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let departmentParams = getFilterParams(indexState.get('departmentFilters'))
    const {current, pageSize, total} = pagination

    if(current != departmentParams.page) {
      departmentParams.page = current
    }

    actions.fetchDepartments(departmentParams)
  }

  render() {
    const {indexState} = this.props
    const departments = indexState.get('departments')
    const paging = indexState.getIn(['departmentFilters', 'paging'])
    const isFetchingDepartments = indexState.get('isFetchingDepartments')

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
          <Col span={6} className="main-content-table-box-tools-search-box">
            
          </Col>
        </Row>
        <Table
          className="main-content-table-box-body"
          size="middle"
          columns={this.columns}
          dataSource={departments.toJS()}
          pagination={{
            total: paging.get('record_total'),
            current: paging.get('page'),
          }}
          rowKey="id"
          onChange={this.handleTableChange}
          loading={isFetchingDepartments}
        />
      </div>
    )
  }
}

export default DepartmentTableBox