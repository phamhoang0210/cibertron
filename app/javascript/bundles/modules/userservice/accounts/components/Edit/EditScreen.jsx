import React from 'react'
import AccountEditBox from './Account/AccountEditBox'

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
    return (
      <div className="main-content userservice--accounts--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update account
          </h1>
        </div>
        <div className="box-body">
          <AccountEditBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen