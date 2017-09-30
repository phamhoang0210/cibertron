import React from 'react'
import CampaignBydateEditForm from './CampaignBydate/Form/CampaignBydateEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCampaignBydate(params.id, {fields: 'campaign{},category{}'})
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-campaign-bydates-edit">
        <h1 className="main-content-title">Update campaignBydate</h1>
        <CampaignBydateEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen