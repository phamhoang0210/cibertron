import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import UserTableBox from './User/UserTable/UserTableBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, location} = this.props
    const userParams = getFilterParams(indexState.get('userFilters'), location)
    actions.fetchUsers(userParams)
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content userservice--users box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <UserTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)