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
      <div>
        <h1>Create new campaign</h1>
        <CampaignNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen