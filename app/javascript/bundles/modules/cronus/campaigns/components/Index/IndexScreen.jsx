import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CampaignsTableBox from './Campaign/CampaignsTable/CampaignsTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const campaignParams = getFilterParams(indexState.get('campaignFilters'))
    actions.fetchCampaigns(campaignParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Campaigns</h1>
        <CampaignsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen