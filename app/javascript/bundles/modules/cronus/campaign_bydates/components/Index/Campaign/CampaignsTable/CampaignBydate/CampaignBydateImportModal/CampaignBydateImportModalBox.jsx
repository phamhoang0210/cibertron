import React from 'react'
import _ from 'lodash'
import { Modal, Button, Input, Col, Select, DatePicker  } from 'antd'
import AlertBox from 'partials/components/Alert/AlertBox'

const { Option } = Select

class CampaignBydateImportModalBox extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const {visible, handleCancel, indexState} = this.props
    const alert = indexState.get('importCampaignBydateAlert')

    return (
      <Modal
        title="Import campaign bydates"
        visible={visible}
        onOk={this.handleAdd}
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
        
      </Modal>
    );
  }
}

export default CampaignBydateImportModalBox