import React from 'react'
import TargetNewForm from './Target/TargetForm/TargetNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  render() {
    return (
      <div className="main-content sol--targets--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new Target
          </h1>
        </div>
        <div className="box-body">
          <TargetNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen