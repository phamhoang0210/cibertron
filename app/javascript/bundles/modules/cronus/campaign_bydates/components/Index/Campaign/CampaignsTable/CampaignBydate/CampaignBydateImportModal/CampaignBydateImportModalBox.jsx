import React from 'react'
import _ from 'lodash'
import { Modal, Button, Input, Col, Select, DatePicker, Table, Tag  } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const { Option } = Select

class CampaignBydateImportModalBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleImport',
    ])

    this.resultTableColumns = [
      {
        title: 'Campaign code',
        dataIndex: 'campaign_code',
        key: 'campaign_code',
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (<Tag color={record.status == 'success' ? 'green' : 'red'}>{text}</Tag>),
      }, {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      }
    ]
  }

  handleImport() {
    const {actions} = this.props
    const file = this.inputFile.files[0]
    var data = new FormData()
    data.append('file', file)
    
    actions.importCampaignBydates(data)
  }

  render() {
    const {visible, handleCancel, indexState} = this.props
    const alert = indexState.get('importCampaignBydateAlert')
    const importResults = indexState.get('importCampaignBydatesResults')
    const isImportCampaignBydates = indexState.get('isImportCampaignBydates')

    return (
      <Modal
        title="Import campaign bydates"
        visible={visible}
        onOk={this.handleImport}
        onCancel={handleCancel}
        okText="Import"
        cancelText="Close"
      >
        {alert && !alert.isEmpty() && (
          <div style={{marginBottom: '8px'}}>
            <AlertBox
              messages={alert.get('messages')}
              type={alert.get('type')}
            />
          </div>
        )}
        <input
          ref={ref => this.inputFile = ref}
          type="file"
          name="file"
          placeholder=""
          accept=".csv"
          required
        />
        <p className="help-block">
          Please upload format correct file (.csv, .xlsx). <a href="#">Sample file</a>
        </p>
        <Table
          size="middle"
          columns={this.resultTableColumns}
          dataSource={importResults.toJS()}
          rowKey="campaign_code"
          loading={isImportCampaignBydates}
          title={() => (<b>Import results:</b>)}
        />
      </Modal>
    );
  }
}

export default CampaignBydateImportModalBox