import React from 'react'
import DomainNewForm from './Domain/DomainForm/DomainNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  render() {
    return (
      <div className="main-content hera-domains-new">
        <h1 className="main-content-title">Create new domain</h1>
        <DomainNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen