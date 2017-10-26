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
      <div className="main-content hera--landing-pages--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <LandingPageNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)