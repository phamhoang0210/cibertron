import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LeadsTableBox from './Lead/LeadsTable/LeadsTableBox'
import LeadFiltersFormBox from './Lead/LeadFiltersForm/LeadFiltersFormBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const leadParams = getFilterParams(indexState.get('leadFilters'))
    actions.fetchLeads(leadParams)
    actions.fetchLeadLevels({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Leads</h1>
        <LeadFiltersFormBox {...this.props}/>
        <LeadsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen