import React from 'react'
import AccountEditBox from './Account/AccountEditBox'
import { injectIntl } from 'react-intl'
import { notify } from 'helpers/applicationHelper'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchAccount(params.id, {fields: 'department{},role{},adminrole{},company{}'})
    actions.fetchDepartments({per_page: 'infinite'})
    actions.fetchRoles({per_page: 'infinite'})
    actions.fetchAdminroles({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.editState.get('notification')
    const nextNoti = nextProps.editState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content authservice--accounts--edit box">
        <div className="box-body">
          <AccountEditBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)