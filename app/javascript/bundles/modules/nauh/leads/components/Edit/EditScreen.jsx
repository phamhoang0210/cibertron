import React from 'react'
import LeadEditForm from './Lead/Form/LeadEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLead(params.id, {fields: 'leadLevel{}'})
    actions.fetchLeadLevels({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Update lead</h1>
        <LeadEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen