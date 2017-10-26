import React from 'react'
import LeadEditForm from './Lead/Form/LeadEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    // actions.fetchLead(params.id, {fields: 'node{}'})
    // actions.fetchNodes({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus--leads--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update lead
          </h1>
        </div>
        <div className="box-body">
          <LeadEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen