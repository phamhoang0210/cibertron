import React from 'react'
import _ from 'lodash'
import { Modal, Button, Input, Col, Select, DatePicker  } from 'antd'
import CampaignBydateAddForm from './CampaignBydateAddForm'
import AlertBox from 'partials/components/Alert/AlertBox'

const { Option } = Select

class CampaignBydateAddModalBox extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleAdd'
    ])
  }

  handleAdd() {
    const {actions} = this.props
    this.form.validateFields((err, values) => {
      actions.createCampaignBydate({record: values})
    })
  }

  render() {
    const {visible, handleCancel, indexState} = this.props
    const alert = indexState.get('createCampaignBydateAlert')

    return (
      <Modal
        title="Add campaign bydates"
        visible={visible}
        onOk={this.handleAdd}
        onCancel={handleCancel}
        okText="Add"
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
        <CampaignBydateAddForm
          {...this.props}
          ref={ref => this.form = ref}
        />
      </Modal>
    );
  }
}

export default CampaignBydateAddModalBox