import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import { injectIntl } from 'react-intl'
import IndexCampaigns from './Campaigns/IndexCampaigns';
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, sharedState} = this.props
    const campaignParams = getFilterParams(indexState.get('campaignsFilters'),location)
    actions.fetchCampaigns(campaignParams)
    actions.fetchAllCampaigns()
    actions.fetchAllUsers()
  }
  
  render() {
    const {indexState} = this.props
    return (
      <div className="main-content captain--campaigns box">
        <div className="box-header">
          <h1 className="box-title">
            Campaigns
          </h1>
        </div>
        <div className="box-body">
         <IndexCampaigns {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)