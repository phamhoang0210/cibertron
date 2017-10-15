import React from 'react'
import _ from 'lodash'
import { Modal, Button, Input, Col, Select, DatePicker, Table, Tag  } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'
import { injectIntl } from 'react-intl'

const { Option } = Select
const EXAMPLE_FILE_URL = 'https://docs.google.com/a/topica.edu.vn/spreadsheets/d/10VUJAbNsYV1IZ_XTLp_9VDP6OWuMsE8_xcavsK7ma6I/edit?usp=sharing'

class LeadImportModalBox extends React.Component {
  constructor(props) {
    super(props)

    const {intl} = this.props

    _.bindAll(this, [
      'handleImport',
    ])

    this.resultTableColumns = [
      {
        title: intl.formatMessage({id: 'attrs.email.label'}),
        dataIndex: 'email',
        key: 'email',
      }, {
        title: intl.formatMessage({id: 'attrs.status.label'}),
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <Tag color={record.status == 'success' ? 'green' : 'red'}>
            {text}
          </Tag>
        ),
      }, {
        title: intl.formatMessage({id: 'attrs.message.label'}),
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
    const {visible, handleCancel, indexState, intl} = this.props
    const alert = indexState.get('importLeadAlert')
    const importResults = indexState.get('importLeadsResults')
    const isImportingLeads = indexState.get('isImportingLeads')

    return (
      <Modal
        title={intl.formatMessage({id: 'index.leads_table.import_modal.results_table.title'})}
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
          {intl.formatMessage({id: 'index.leads_table.import_modal.help.upload_file.text'})}
          <a target="_blank" href={EXAMPLE_FILE_URL}>
            {intl.formatMessage({id: 'index.leads_table.import_modal.help.upload_file.sample_file'})}
          </a>
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

export default injectIntl(LeadImportModalBox)