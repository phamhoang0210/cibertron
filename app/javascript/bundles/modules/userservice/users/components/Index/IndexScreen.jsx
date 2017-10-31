import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import UserTableBox from './User/UserTable/UserTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const userParams = getFilterParams(indexState.get('userFilters'))
    actions.fetchUsers(userParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content userservice--users box">
        <div className="box-header">
          <h1 className="box-title">
            Users
          </h1>
        </div>
        <div className="box-body">
          <UserTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen