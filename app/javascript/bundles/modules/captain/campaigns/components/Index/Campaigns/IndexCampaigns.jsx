import React from 'react'
import CampaignsTableBox from './CampaignsTableBox';
import CampaignsFilter from './CampaignsFilter';
class IndexCampaigns extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <CampaignsFilter {...this.props}/>
        <CampaignsTableBox {...this.props}/>
      </div>   
    )
  }
}

export default IndexCampaigns
