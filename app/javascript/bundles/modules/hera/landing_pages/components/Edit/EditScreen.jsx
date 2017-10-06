import React from 'react'
import LandingPageEditForm from './LandingPage/Form/LandingPageEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLandingPage(params.id)
    actions.fetchDiscounts({per_page: 'infinite', fields: 'product_json'})
    actions.fetchDomains({per_page: 'infinite'})
    actions.fetchFacebookApps({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-landingPages-edit">
        <h1 className="main-content-title">Update landingPage</h1>
        <LandingPageEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen