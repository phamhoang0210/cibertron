import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CampaignsTableBox from './Campaign/CampaignsTable/CampaignsTableBox'
class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const campaignParams = getFilterParams(indexState.get('campaignFilters'))
    actions.fetchCampaigns(campaignParams)
    actions.fetchListCampaign({per_page: 'infinite'})
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Campaign bydates</h1>
        <CampaignsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen