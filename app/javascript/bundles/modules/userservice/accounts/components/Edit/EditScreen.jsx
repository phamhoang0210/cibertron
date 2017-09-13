import React from 'react'
import AccountEditForm from './Account/Form/AccountEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchAccount(params.id)
  }

  render() {
    return (
      <div>
        <h1>Update account</h1>
        <AccountEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen