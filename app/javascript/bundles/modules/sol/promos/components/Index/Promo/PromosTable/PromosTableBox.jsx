import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { PROMOS_URL } from '../../../../constants/paths'
import { Badge, Menu, Dropdown } from 'antd';

class PromosTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let promoParams = getFilterParams(indexState.get('promoFilters'))
    const {current, pageSize, total} = pagination

    if(current != promoParams.page) {
      promoParams.page = current
    }

    actions.fetchPromos(promoParams)
  }

  render() {
    const {indexState} = this.props
    const promos = indexState.get('promos')
    const paging = indexState.getIn(['promoFilters', 'paging'])
    const isFetchingPromos = indexState.get('isFetchingPromos')
    const data = indexState.get('promos').toJS()
    const columns = [
      {title: 'Name', dataIndex: 'name', key: 'name'}, 
      {title: 'Type', dataIndex: 'promo_type', key: 'promo_type'},
      {title: 'Target', dataIndex: 'target_id', key: 'target_id'},
      {title: 'Date', dataIndex: 'created_at', key: 'created_at'}
    ]

    const expandedRowRender = (record) => {
      
    };

    return (
      <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={data}
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          onChange={this.handleTableChange}
          loading={isFetchingPromos}
          rowKey="id"
        />
    );
  }

}
export default PromosTableBox