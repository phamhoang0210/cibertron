import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm } from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { browserHistory } from 'react-router'
import { COMBOS_URL } from '../../../../constants/paths'
import { Badge, Menu, Dropdown } from 'antd';

class CombosTableBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleTableChange',
    ])
  }

  handleTableChange(pagination, filters, sorter) {
    const {actions, indexState} = this.props
    let comboParams = getFilterParams(indexState.get('comboFilters'))
    const {current, pageSize, total} = pagination

    if(current != comboParams.page) {
      comboParams.page = current
    }

    actions.fetchCombos(comboParams)
  }

  render() {
    const {indexState} = this.props
    const combos = indexState.get('combos')
    const paging = indexState.getIn(['comboFilters', 'paging'])
    const isFetchingCombos = indexState.get('isFetchingCombos')
    const data = indexState.get('combos').toJS()
    const columns = [
      {title: 'Code', dataIndex: 'code', key: 'code'}, 
      {title: 'Price', dataIndex: 'price', key: 'price'}
    ]

    const expandedRowRender = (record) => {
      var ratio = record.money_ratio
      ratio = ratio.replace('{','');
      ratio = ratio.replace('}','');
      ratio = ratio.split(',');
      ratio = ratio.map(i => i = i.split('=>'));
      for(var a= 0; a < ratio.length; a++){
        ratio[a][0] = ratio[a][0].replace('"','').replace('"','').replace(' ','');
        ratio[a][1] = parseInt(ratio[a][1]);
      }

      const data = [];
      for (let i = 0; i < ratio.length; ++i) {
        data.push({
          code: ratio[i][0],
          price: ratio[i][1]
        });
      }

      const columns = [
        { title: 'Code', dataIndex: 'code', key: 'excode' },
        { title: 'Price', dataIndex: 'price', key: 'exprice'}
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
      <Table
        size="middle"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
        pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
        onChange={this.handleTableChange}
        loading={isFetchingCombos}
        rowKey="id"
      />
    );
  }

}
export default CombosTableBox