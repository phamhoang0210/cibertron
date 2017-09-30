import React from 'react'
import ProviderEditForm from './Provider/Form/ProviderEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchProvider(params.id)
  }

  render() {
    return (
      <div className="main-content cronus-providers-edit">
        <h1 className="main-content-title">Update provider</h1>
        <ProviderEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen