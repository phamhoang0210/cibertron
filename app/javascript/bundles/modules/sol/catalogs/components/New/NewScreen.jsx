import React from 'react'
import CatalogNewForm from './Catalog/CatalogForm/CatalogNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCourses({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content nauh-leads-new">
        <h1 className="main-content-title">Create new catalog</h1>
        <CatalogNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen