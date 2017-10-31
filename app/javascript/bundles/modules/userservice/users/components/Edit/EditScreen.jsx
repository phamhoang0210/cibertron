import React from 'react'
import UserEditBox from './User/UserEditBox'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchUser(params.id, {fields: 'basic_profile{}'})
  }

  render() {
    return (
      <div className="main-content userservice--users--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update user
          </h1>
        </div>
        <div className="box-body">
          <UserEditBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen