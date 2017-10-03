import React from 'react'
import LandingpageNewForm from './Landingpage/LandingpageForm/LandingpageNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchProviders({per_page: 'infinite'})
    actions.fetchCategories({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content cronus-landingpages-new">
        <h1 className="main-content-title">Create new landingpage</h1>
        <LandingpageNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen