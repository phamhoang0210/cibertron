import React from 'react'
import AccountEditBox from './Account/AccountEditBox'
import { injectIntl } from 'react-intl'

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