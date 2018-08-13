import React from 'react'
import CampaignEditForm from './Campaign/CampaignForm/CampaignEditForm'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
    actions.fetchCampaign(params.id)
  }

  render() {
    return (
      <div className="main-content captain--campaigns--edit box">
        <div className="box-header">
          <h1 className="box-title">
            EDIT CHIẾN DỊCH & QUẢN LÝ DEAL
          </h1>
        </div>
        <div className="box-body">
          <CampaignEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)