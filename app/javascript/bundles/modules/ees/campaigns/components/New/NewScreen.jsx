import React from 'react'
import CampaignNewForm from './Campaign/CampaignForm/CampaignNewForm'
import {injectIntl} from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchSenders({per_page: 'infinite'})
    actions.fetchTemplates({per_page: 'infinite',fields: 'name,code,id'})
    actions.fetchLists({per_page: 'infinite'})
  }

  render() {
    const {intl} = this.props
    return (
      <div className="main-content furion--campaigns--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <CampaignNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)