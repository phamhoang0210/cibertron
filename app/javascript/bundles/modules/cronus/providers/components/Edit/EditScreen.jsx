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
      <div>
        <h1>Update provider</h1>
        <ProviderEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen