import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Table, Icon, Button, Input, Row, Col, Select } from 'antd'
import { getFilterParams, mergeDeep } from 'helpers/applicationHelper'
import LeadReportFormBox from './LeadReportForm/LeadReportFormBox'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item

class ReportTableBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    this.columns = [, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.staff_id.label'}),
      dataIndex: 'staff_id',
      key: 'staff_id',
      render: value => {
        const {sharedState} = this.props
        const users = sharedState.get('users')
        const user = users.find(u => u.get('id') == value)
        return user ? user.get('username') : value
      }
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.lich_hen.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.dinh_muc.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.xu_ly_trong_lich.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.xu_ly_ngoai_lich.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.chua_goi.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.tong_ton.label'}),
      dataIndex: '',
      key: '',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.a0.label'}),
      dataIndex: 'A0',
      key: 'A0',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.a1.label'}),
      dataIndex: 'A1',
      key: 'A1',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.a2.label'}),
      dataIndex: 'A2',
      key: 'A2',
    }, {
      title: intl.formatMessage({id: 'attrs.lead_level.attrs.a3.label'}),
      dataIndex: 'A3',
      key: 'A3',
    }];

    this.formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  }


  render() {
    const {reportState, actions} = this.props
    const isFetchingLeadReport = reportState.get('isFetchingLeadReporting')
    const leadReport = reportState.get('leadReporting')
    const emptyStaffReport = leadReport.find(r => !r.get('staff_id'))

    return (
      <div className="main-content-table-box">
        <Row className="main-content-table-box-tools">
          <Col span={24}>
            <LeadReportFormBox {...this.props}/>
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

export default injectIntl(ReportTableBox)