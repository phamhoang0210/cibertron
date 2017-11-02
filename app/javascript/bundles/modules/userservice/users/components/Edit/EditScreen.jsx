import React from 'react'
import UserEditBox from './User/UserEditBox'
import { injectIntl } from 'react-intl'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchUser(params.id, {fields: 'basic_profile{}'})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content userservice--users--edit box">
        <div className="box-header">
        </div>
        <div className="box-body">
          <UserEditBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(EditScreen)