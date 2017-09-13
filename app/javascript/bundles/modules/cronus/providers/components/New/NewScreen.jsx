import React from 'react'
import ProviderNewForm from './Provider/ProviderForm/ProviderNewForm'

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
        <h1>Create new provider</h1>
        <ProviderNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen