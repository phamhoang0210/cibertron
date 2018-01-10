import React from 'react'
import ListEditForm from './List/ListForm/ListEditForm'
import { injectIntl } from 'react-intl'
import { Row, Col, notification, Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane;

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params, editState} = this.props
    actions.fetchList(params.id, {fields: 'upload_files{}'})
  }

  render() {
    const {intl, sharedState, editState} = this.props

    return (
      <div className="main-content morphling--lists--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <ListEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)