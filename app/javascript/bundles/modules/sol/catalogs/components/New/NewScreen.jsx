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
      <div className="main-content sol--catalogs--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new catalog
          </h1>
        </div>
        <div className="box-body">
          <CatalogNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen