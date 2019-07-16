import React from 'react'
import LandingPageNewForm from './LandingPage/LandingPageForm/LandingPageNewForm'
import { injectIntl } from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchDiscounts({fields: 'product_json', per_page: 50})
    actions.fetchDomains({})
    actions.fetchLogics({per_page: 'infinite'})
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