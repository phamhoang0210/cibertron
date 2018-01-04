import React from 'react'
import TemplateEditForm from './Template/TemplateForm/TemplateEditForm'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane;

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params, editState} = this.props
    actions.fetchTemplate(params.id)
  }

  render() {
    const {intl, sharedState, editState} = this.props

    return (
      <div className="main-content morphling--templates--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <TemplateEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)