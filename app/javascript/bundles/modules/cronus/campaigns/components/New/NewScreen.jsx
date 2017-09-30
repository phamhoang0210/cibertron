import React from 'react'
import CampaignNewForm from './Campaign/CampaignForm/CampaignNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchNodes({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-campaigns-new">
        <h1 className="main-content-title">Create new campaign</h1>
        <CampaignNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen