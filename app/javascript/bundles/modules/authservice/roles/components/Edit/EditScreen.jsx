import React from 'react'
import { notify } from 'helpers/applicationHelper'
import RoleEditForm from './Role/Form/RoleEditForm'
import {injectIntl} from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchRole(params.id, {fields: 'assignment{}'})
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.editState.get('notification')
    const nextNoti = nextProps.editState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content authservice--roles--edit box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'edit.title'})}
          </h1>
        </div>
        <div className="box-body">
          <RoleEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)