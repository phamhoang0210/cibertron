import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LeadsTableBox from './Lead/LeadsTable/LeadsTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    // const leadParams = getFilterParams(indexState.get('leadFilters'))
    // actions.fetchLeads(leadParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Leads</h1>
        <LeadsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen