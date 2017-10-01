import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LeadsTableBox from './Lead/LeadsTable/LeadsTableBox'
import LeadFiltersFormBox from './Lead/LeadFiltersForm/LeadFiltersFormBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const leadParams = getFilterParams(indexState.get('leadFilters'))
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
    const {indexState} = this.props
    return (
      <div className="main-content nauh-leads">
        <h1 className="main-content-title">Leads</h1>
        <LeadFiltersFormBox {...this.props}/>
        <LeadsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen