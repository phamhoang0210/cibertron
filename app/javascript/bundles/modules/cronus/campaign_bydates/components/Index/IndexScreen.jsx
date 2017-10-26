import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CampaignsTableBox from './Campaign/CampaignsTable/CampaignsTableBox'
import { notification } from 'antd'

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
      <div className="main-content cronus--campaign-bydates box">
        <div className="box-header">
          <h1 className="box-title">
            Campaign bydates
          </h1>
        </div>
        <div className="box-body">
          <CampaignsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen