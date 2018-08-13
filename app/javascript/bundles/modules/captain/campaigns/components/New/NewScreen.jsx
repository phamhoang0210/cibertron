import React from 'react'
import { injectIntl } from 'react-intl'
import NewCampaign from './Campaign/NewCampaign';

class NewScreen extends React.Component{
	constructor(props) {
		super(props)
	}

	render() {
    return (
      <div className="main-content captain--campaigns box">
        <div className="box-header">
          <h1 className="box-title">
            Tạo chiến dịch
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