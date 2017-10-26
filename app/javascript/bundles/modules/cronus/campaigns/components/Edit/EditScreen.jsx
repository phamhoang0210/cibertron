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
      <div className="main-content cronus--campaigns--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update campaign
          </h1>
        </div>
        <div className="box-body">
          <CampaignEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen