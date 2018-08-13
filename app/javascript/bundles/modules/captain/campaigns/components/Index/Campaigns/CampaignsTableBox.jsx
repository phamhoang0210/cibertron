import React from 'react'
import _ from 'lodash'
import { Table, Icon, Button, Popconfirm, Divider} from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
// import { browserHistory } from 'react-router'
// import { PROMOS_URL } from '../../../../constants/paths'
// import { Badge, Menu, Dropdown } from 'antd';

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('abc',this.props)
    const columns = [
      {
        title: 'Tên chiến dịch',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Người tạo',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Số lượng deal',
        dataIndex: 'deal',
        key: 'deal',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'date_create',
        key: 'date_create',
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'date_over',
        key: 'date_over',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button style={{marginRight:10}}>Edit</Button>
            <Button type="danger">Delete</Button>
          </div>          
        )
      }
    ];

    const {indexState} = this.props
    const data = indexState['records']
    console.log('data',data)
    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={data}
        bordered
      />
    );
  }

}
export default CampaignsTableBox