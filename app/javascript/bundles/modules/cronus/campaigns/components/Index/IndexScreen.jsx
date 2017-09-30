import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CampaignsTableBox from './Campaign/CampaignsTable/CampaignsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const campaignParams = getFilterParams(indexState.get('campaignFilters'))
    actions.fetchCampaigns(campaignParams)
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content cronus-campaigns">
        <h1 className="main-content-title">Campaigns</h1>
        <CampaignsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen