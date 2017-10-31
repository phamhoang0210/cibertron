import React from 'react'
import AccountNewForm from './Account/AccountForm/AccountNewForm'
import { injectIntl } from 'react-intl'

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
    const {intl} = this.props

    return (
      <div className="main-content authservice--accounts--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'new.title'})}
          </h1>
        </div>
        <div className="box-body">
        <AccountNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(NewScreen)