import React from 'react'
import LandingPageNewForm from './LandingPage/LandingPageForm/LandingPageNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchDiscounts({per_page: 'infinite', fields: 'product_json'})
    actions.fetchDomains({per_page: 'infinite'})
    actions.fetchFacebookApps({per_page: 'infinite'})
    actions.fetchFacebookPixelCodes({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-landingPages-new">
        <h1 className="main-content-title">Create new landingPage</h1>
        <LandingPageNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen