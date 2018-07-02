import React from 'react'
import PriceNewForm from './Price/PriceForm/PriceNewForm'
import { injectIntl } from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, location} = this.props
    const {query} = location
    if(query && query.lead_id) {
      actions.fetchLead(query.lead_id)
    }
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
    actions.fetchProvinces({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content nauh--leads--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <PriceNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)