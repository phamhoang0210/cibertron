import React from 'react'
import { injectIntl } from 'react-intl'
import NewCampaign from './Campaign/NewCampaign';

class NewScreen extends React.Component{
	constructor(props) {
		super(props)
	}

  componentDidMount() {
    const {actions, newState, sharedState} = this.props
    actions.fetchAllCampaigns()
    actions.fetchAllUsers()
  }

	render() {
    return (
      <div className="main-content captain--campaigns box">
        <div className="box-header">
          <h1 className="box-title">
            TẠO CHIẾN  DỊCH
          </h1>
        </div>
        <div className="box-body">
         <NewCampaign {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)