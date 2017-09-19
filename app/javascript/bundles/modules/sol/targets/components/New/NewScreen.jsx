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
      <div>
        <h1>Create new Target</h1>
        <TargetNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen