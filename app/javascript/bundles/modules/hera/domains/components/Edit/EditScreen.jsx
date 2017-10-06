import React from 'react'
import DomainEditForm from './Domain/Form/DomainEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDomain(params.id, {fields: 'landing_page{}'})
  }

  render() {
    return (
      <div className="main-content hera-domains-edit">
        <h1 className="main-content-title">Update domain</h1>
        <DomainEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen