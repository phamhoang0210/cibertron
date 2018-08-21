import React from 'react'
import CampaignEditForm from './Campaign/CampaignForm/CampaignEditForm'
import DetailCampaignEditForm from './Campaign/CampaignForm/DetailCampaignEditForm'
import {notification} from 'antd'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.editState.get('alert')
    const nextAlert = nextProps.editState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  componentDidMount() {
    const {actions, editState, params} = this.props
    actions.fetchCampaign(params.id)
  }

  render() {
    const { editState } = this.props
    const alert = editState.get('alert')

    return (
      <div className="main-content captain--campaigns--edit box">
        <div className="box-header">
          <h1 className="box-title">
            EDIT CHIẾN DỊCH & QUẢN LÝ DEAL
          </h1>
        </div>
        <div className="box-body">
          <CampaignEditForm {...this.props}/>
          <br />
          <hr />
          <DetailCampaignEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)