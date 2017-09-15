import React from 'react'
import AccountNewForm from './Account/AccountForm/AccountNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchDepartments({per_page: 'infinite'})
    // actions.fetchRoles({per_page: 'infinite'})
    // actions.fetchAdminroles({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Create new account</h1>
        <AccountNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen