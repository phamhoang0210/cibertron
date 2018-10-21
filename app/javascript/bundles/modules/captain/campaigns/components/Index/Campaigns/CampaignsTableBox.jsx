import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import { CAMPAIGNS_URL } from '../../../constants/paths'
import { Table, Icon, Button, Popconfirm} from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME, SHORT_DATETIME_FORMAT } from 'app/constants/datatime'
import moment from 'moment';
import {getFilterParams, getDefaultTablePagination } from 'helpers/applicationHelper'
import { injectIntl } from 'react-intl'

class CampaignsTableBox extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
    'handleTableChange'
    ])
  }
  handleEdit(record) {
    browserHistory.push(`${CAMPAIGNS_URL}/${record.id}/edit`)
  }

  handleTableChange(pagination) {
    const {actions, indexState} = this.props
    let campaignsParams = getFilterParams(indexState.get('campaignsFilters'))
    const {current} = pagination
    if(current !== campaignsParams.page) {
        campaignsParams.page = current
    }
    actions.fetchCampaigns(campaignsParams)
  }

  handleDelete(record) {
    const campaignId = record.id
    const {actions} = this.props
    actions.deleteCampaign(campaignId);
  }

  type(record){
    if(record.display === true){
      return 'Active'
    }
    return 'Deactive'
  }
  
  render() {
    const {indexState, intl} = this.props
    const data = indexState.toJS().campaign
    const paging = indexState.getIn(['campaignsFilters', 'paging'])
    const columns = [
      {
        title: 'Tên chiến dịch',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Type',
        key: 'display',
        width: 90,
        render: (text, record) => (
          <span>{this.type(record)}</span>
        )
        
      },
      {
        title: 'Người tạo',
        dataIndex: 'creator',
        key: 'creator',
        width: 120
      },
      {
        title: 'SL deal',
        dataIndex: 'course_number',
        key: 'course_number',
        width: 100,
        render: (text, record) => (
          <span>{record.campaign_courses.length}</span>
        )
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150,
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Ngày bắt đầu',
        width: 150,
        dataIndex: 'start_time',
        key: 'start_time',
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'end_time',
        key: 'end_time',
        width: 150,
        render: value => value ? moment(value).format(SHORT_DATETIME_FORMAT) : ''
      },
      {
        title: 'Action',
        key: 'action',
        width: 140,
        render: (text, record) => (
          <div>
            <Button onClick = {this.handleEdit.bind(this, record)} style={{marginRight:10}}><Icon type="edit" /></Button>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({id: 'popconfirm.delete.title'})}
              onConfirm={()=>this.handleDelete(record)}
              okText={intl.formatMessage({id: 'popconfirm.delete.ok_text'})}
              cancelText={intl.formatMessage({id: 'popconfirm.delete.cancel_text'})}
            >
            <Button type="danger"><Icon type="delete" /></Button>
            </Popconfirm>
          </div>
        )
      }
    ];
    return (
      <div>
        <Table
          pagination={getDefaultTablePagination(paging.get('page'), paging.get('record_total'))}
          className="components-table-demo-nested"
          columns={columns}
          dataSource={data}
          bordered
          rowKey ='id'
          onChange={this.handleTableChange}
        />
      </div>
      
    );
  }

}
export default injectIntl(CampaignsTableBox)