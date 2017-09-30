import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LeadsTableBox from './Lead/LeadsTable/LeadsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    // const leadParams = getFilterParams(indexState.get('leadFilters'))
    // actions.fetchLeads(leadParams)
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
      <div>
        <h1>Leads</h1>
        <LeadsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen