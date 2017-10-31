import React from 'react'
import { notify } from 'helpers/applicationHelper'
import RoleNewForm from './Role/RoleForm/RoleNewForm'
import { injectIntl } from 'react-intl'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.newState.get('notification')
    const nextNoti = nextProps.newState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content authservice--roles--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
          <RoleNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)