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
      <div>
        <h1>Create new campaignBydate</h1>
        <CampaignBydateNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen