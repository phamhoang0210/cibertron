import React from 'react'
import CampaignBydateNewForm from './CampaignBydate/CampaignBydateForm/CampaignBydateNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus--campaign-bydates--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new campaignBydate
          </h1>
        </div>
        <div className="box-body">
          <CampaignBydateNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen