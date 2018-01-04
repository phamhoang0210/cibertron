import React from 'react'
import SenderEditForm from './Sender/SenderForm/SenderEditForm'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane;

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params, editState} = this.props
    actions.fetchSender(params.id)
  }

  render() {
    const {intl, sharedState, editState} = this.props

    return (
      <div className="main-content meepo--senders--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <SenderEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)