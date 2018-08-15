import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import { Table, Icon, Button, Popconfirm, Divider} from 'antd'
import { getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME, SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment';
import { injectIntl } from 'react-intl'
// import { browserHistory } from 'react-router'
// import { PROMOS_URL } from '../../../../constants/paths'
// import { Badge, Menu, Dropdown } from 'antd';

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
    ])
  }
  handleEdit(record) {
    browserHistory.push(`${CAMPAIGNS_URL}/${record.id}/edit`)
  }
  handleDelete(record) {
    const campaignId = record.id
    const {actions, indexState} = this.props
    actions.deleteCampaign(campaignId)
  }
  type(record){
    if(record.display === true){
      return 'Action'
    }
    return 'Deactive'
  }
  render() {
    const {indexState, intl} = this.props
    const data = indexState.toJS().campaign
    const columns = [
      {
        title: 'Tên chiến dịch',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Type',
        key: 'display',
        render: (text, record) => (
          <span>{this.type(record)}</span>
        )
        
      },
      {
        title: 'Người tạo',
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: 'Số lượng deal',
        dataIndex: 'course_number',
        key: 'course_number',
        render: (text, record) => (
          <span>{record.campaign_courses.length}</span>
        )
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'start_time',
        key: 'start_time',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'end_time',
        key: 'end_time',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Action',
        key: 'action',
        width: 180,
        render: (text, record) => (
          <div>
            <Button onClick = {this.handleEdit.bind(this, record)} style={{marginRight:10}}>Edit</Button>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={()=>this.handleDelete(record)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
            <Button type="danger">Delete</Button>
            </Popconfirm>
          </div>
        )
      }
    ];
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
export default injectIntl(CampaignsTableBox)