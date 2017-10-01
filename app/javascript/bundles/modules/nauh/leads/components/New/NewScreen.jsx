import React from 'react'
import LeadNewForm from './Lead/LeadForm/LeadNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchLeadLevels({per_page: 'infinite'})
    actions.fetchCareStatuses({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content nauh-leads-new">
        <h1 className="main-content-title">Create new lead</h1>
        <LeadNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen