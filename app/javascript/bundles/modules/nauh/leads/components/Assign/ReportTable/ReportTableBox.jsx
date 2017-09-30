import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Table, Icon, Button, Input, Row, Col, Select } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import LeadAssignFormBox from './LeadAssignForm/LeadAssignFormBox'

const FormItem = Form.Item

class ReportTableBox extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [, {
      title: 'Staff',
      dataIndex: 'staff_id',
      key: 'staff_id',
      render: value => {
        const {sharedState} = this.props
        const users = sharedState.get('users')
        const user = users.find(u => u.get('id') == value)
        return user ? user.get('username') : value
      }
    }, {
      title: 'A0',
      dataIndex: 'A0',
      key: 'A0',
    }, {
      title: 'A1',
      dataIndex: 'A1',
      key: 'A1',
    }, {
      title: 'A2',
      dataIndex: 'A2',
      key: 'A2',
    }, {
      title: 'A3',
      dataIndex: 'A3',
      key: 'A3',
    }, {
      title: 'A3X',
      dataIndex: 'A3X',
      key: 'A3X',
    }];

    this.formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  }


  render() {
    const {assignState, actions} = this.props
    const isFetchingLeadReport = assignState.get('isFetchingLeadReport')
    const leadReport = assignState.get('leadReport')
    const emptyStaffReport = leadReport.find(r => !r.get('staff_id'))

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={24}>
            <LeadAssignFormBox {...this.props}/>
          </Col>
        </Row>
        <Table
          size="medium"
          pagination={{ pageSize: 10 }}
          columns={this.columns}
          dataSource={leadReport.toJS()}
          rowKey="staff_id"
          loading={isFetchingLeadReport}
        />
      </div>
    )
  }
}

export default ReportTableBox