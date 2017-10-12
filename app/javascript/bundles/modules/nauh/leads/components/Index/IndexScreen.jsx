import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import LeadsTableBox from './Lead/LeadsTable/LeadsTableBox'
import LeadFiltersFormBox from './Lead/LeadFiltersForm/LeadFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const leadParams = getFilterParamsAndSyncUrl(indexState.get('leadFilters'), location)
    
    actions.fetchLeads(leadParams)
    actions.fetchLeadLevels({per_page: 'infinite'})
    actions.fetchCareStatuses({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
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
      <div className="main-content nauh-leads">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'index.title'})}
        </h1>
        <LeadFiltersFormBox {...this.props}/>
        <LeadsTableBox {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)