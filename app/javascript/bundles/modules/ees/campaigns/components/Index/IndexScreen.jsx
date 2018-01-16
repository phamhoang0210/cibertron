import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import CampaignsTableBox from './Campaign/CampaignsTable/CampaignsTableBox'
import CampaignFiltersFormBox from './Campaign/CampaignFiltersForm/CampaignFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const campaignParams = getFilterParamsAndSyncUrl(indexState.get('campaignFilters'), location)
    //campaignParams["fields"]="id,name,created_at,log_count,open_count,status,updated_at,user_id"
    campaignParams["fields"]="id,name,created_at,status,updated_at,user_id"
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
    const {indexState, intl} = this.props
    return (
      <div className="main-content furion--campaigns box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <CampaignFiltersFormBox {...this.props}/>
          <CampaignsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)