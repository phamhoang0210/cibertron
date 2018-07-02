import React from 'react'
import CampaignEditForm from './Campaign/CampaignForm/CampaignEditForm'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane;

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCampaign(params.id)
    actions.fetchSenders({per_page: 'infinite'})
    actions.fetchTemplates({per_page: 'infinite',fields: 'name,code,id'})
    actions.fetchLists({per_page: 'infinite', fields: 'name,id'})
  }

  render() {
    const {intl, sharedState, editState} = this.props
    return (
      <div className="main-content furion--campaigns--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <CampaignEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)