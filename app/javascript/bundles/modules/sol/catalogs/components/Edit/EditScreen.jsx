import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CatalogEditForm from './Catalog/CatalogForm/CatalogEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, editState, params} = this.props
    actions.fetchCourses({per_page: 'infinite'})
    
    actions.fetchCatalog(params.id, {per_page: 'infinite', fields: "catalog_courses{course{}}"})
  }

  render() {
    return (
      <div className="main-content nauh-leads-new">
        <h1 className="main-content-title">Edit catalog</h1>
        <CatalogEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen