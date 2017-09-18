import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { TARGETS_URL } from '../../../../constants/paths'
import { Badge, Menu, Dropdown } from 'antd';

class TargetsTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let targetParams = getFilterParams(indexState.get('targetFilters'))
    const {current, pageSize, total} = pagination

    if(current != targetParams.page) {
      targetParams.page = current
    }

    actions.fetchTargets(targetParams)
  }

  render() {
    const {indexState} = this.props
    const targets = indexState.get('targets')
    const paging = indexState.getIn(['targetFilters', 'paging'])
    const isFetchingTargets = indexState.get('isFetchingTargets')
    console.log(indexState)
    const data = indexState.get('targets').toJS()
    const columns = [
      {title: 'Name', dataIndex: 'name', key: 'name'},
      {title: 'Code', dataIndex: 'code', key: 'code'}, 
      {title: 'Created At', dataIndex: 'created_at', key: 'created_at'}
    ]

    const expandedRowRender = (record) => {
    };

    return (
      <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={data}
          pagination={{ total: paging.get('record_total'), current: paging.get('page'), }}
          onChange={this.handleTableChange}
          loading={isFetchingTargets}
          rowKey="id"
        />
    );
  }

}
export default TargetsTableBox