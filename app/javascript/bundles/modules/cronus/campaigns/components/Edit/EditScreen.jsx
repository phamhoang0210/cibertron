import React from 'react'
import CampaignEditForm from './Campaign/Form/CampaignEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCampaign(params.id, {fields: 'node{}'})
    actions.fetchNodes({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-campaigns-edit">
        <h1 className="main-content-title">Update campaign</h1>
        <CampaignEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen