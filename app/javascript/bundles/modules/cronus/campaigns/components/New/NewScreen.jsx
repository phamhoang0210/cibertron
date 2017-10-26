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
      <div className="main-content cronus--campaigns--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new campaign
          </h1>
        </div>
        <div className="box-body">
          <CampaignNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen