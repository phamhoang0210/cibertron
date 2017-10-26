import React from 'react'
import LandingPageEditForm from './LandingPage/Form/LandingPageEditForm'
import { injectIntl } from 'react-intl'

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
    actions.fetchFacebookPixelCodes({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--landing-pages--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <LandingPageEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)