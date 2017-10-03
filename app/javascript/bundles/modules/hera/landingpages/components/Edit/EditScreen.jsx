import React from 'react'
import LandingpageEditForm from './Landingpage/Form/LandingpageEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLandingpage(params.id, {fields: 'provider{},category{}'})
    actions.fetchProviders({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-landingpages-edit">
        <h1 className="main-content-title">Update landingpage</h1>
        <LandingpageEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen