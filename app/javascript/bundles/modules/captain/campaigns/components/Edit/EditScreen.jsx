import React from 'react'
import CampaignEditForm from './Campaign/CampaignForm/CampaignEditForm'
import DetailCampaignEditForm from './Campaign/CampaignForm/DetailCampaignEditForm'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, editState, params} = this.props
    actions.fetchCampaign(params.id)
  }

  render() {
    const { editState } = this.props
    const leftData = editState.get('left_records')
    const rightData = editState.get('right_records')

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