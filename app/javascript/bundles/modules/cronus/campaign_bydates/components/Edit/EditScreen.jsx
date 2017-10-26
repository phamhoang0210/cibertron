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
      <div className="main-content cronus--campaign-bydates--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update campaignBydate
          </h1>
        </div>
        <div className="box-body">
          <CampaignBydateEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen