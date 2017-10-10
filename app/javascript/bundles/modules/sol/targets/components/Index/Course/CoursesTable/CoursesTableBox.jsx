import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../../constants/paths'
import { Badge, Menu, Dropdown } from 'antd';

class CoursesTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let courseParams = getFilterParams(indexState.get('courseFilters'))
    const {current, pageSize, total} = pagination

    if(current != courseParams.page) {
      courseParams.page = current
    }

    actions.fetchCourses(courseParams)
  }

  render() {
    const {indexState} = this.props
    const courses = indexState.get('courses')
    const paging = indexState.getIn(['courseFilters', 'paging'])
    const isFetchingCourses = indexState.get('isFetchingCourses')

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Code',
      dataIndex: 'code',
      key: 'code'
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    }];
  const data = indexState.get('courses').toJS()
    return (
      <Table 
        columns={columns} dataSource={data} 
        pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
        onChange={this.handleTableChange}
        loading={isFetchingCourses}
        rowKey="id"
      />
    )
  }
}
export default CoursesTableBox






