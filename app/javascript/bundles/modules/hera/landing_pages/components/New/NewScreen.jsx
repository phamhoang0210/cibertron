import React from 'react'
import LandingPageNewForm from './LandingPage/LandingPageForm/LandingPageNewForm'
import { injectIntl } from 'react-intl'

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
    const {intl} = this.props
    
    return (
      <div className="main-content cronus-landing-pages-new">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'new.title'})}
        </h1>
        <LandingPageNewForm {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(NewScreen)