import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CampaignBydatesTableBox from './CampaignBydate/CampaignBydatesTable/CampaignBydatesTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const campaignBydateParams = getFilterParams(indexState.get('campaignBydateFilters'))
    actions.fetchCampaignBydates(campaignBydateParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Filter box</h1>
        <hr/>
        <CampaignBydatesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen