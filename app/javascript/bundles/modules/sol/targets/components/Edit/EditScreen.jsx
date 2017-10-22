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
      <div className="main-content sol--targets--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update channel
          </h1>
        </div>
        <div className="box-body">
          <TargetEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen