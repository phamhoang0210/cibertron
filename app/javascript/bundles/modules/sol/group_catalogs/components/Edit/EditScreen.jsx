import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import GroupCatalogEditForm from './GroupCatalog/GroupCatalogForm/GroupCatalogEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, editState, params} = this.props
    actions.fetchCatalogs({per_page: 'infinite'})
    
    actions.fetchGroupCatalog(params.id, {per_page: 'infinite', fields: "group_catalogs{catalog{}}"})
  }

  render() {
    return (
      <div className="main-content sol--catalogs--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Edit group catalog
          </h1>
        </div>
        <div className="box-body">
          <GroupCatalogEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen