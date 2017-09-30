import React from 'react'
import _ from 'lodash'
import { Modal, Button, Input, Col, Select, DatePicker, Table, Tag  } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const { Option } = Select

class LeadImportModalBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleImport',
    ])

    this.resultTableColumns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <Tag color={record.status == 'success' ? 'green' : 'red'}>
            {text}
          </Tag>
        ),
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
    
    actions.importLeads(data)
  }

  render() {
    const {visible, handleCancel, indexState} = this.props
    const alert = indexState.get('importLeadAlert')
    const importResults = indexState.get('importLeadsResults')
    const isImportingLeads = indexState.get('isImportingLeads')

    return (
      <Modal
        title="Import leads"
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
          pagination={{ pageSize: 10 }} 
          columns={this.resultTableColumns}
          dataSource={importResults.toJS()}
          rowKey="email"
          loading={isImportingLeads}
          title={() => (<b>Import results:</b>)}
        />
      </Modal>
    );
  }
}

export default LeadImportModalBox