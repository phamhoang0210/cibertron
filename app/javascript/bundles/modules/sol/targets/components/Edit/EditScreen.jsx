import React from 'react'
import TargetEditForm from './Target/Form/TargetEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
  }

  render() {
    return (
      <div>
        <h1>Update channel</h1>
        <TargetEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen