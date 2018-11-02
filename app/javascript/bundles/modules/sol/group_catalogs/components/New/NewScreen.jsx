import React from 'react'
import GroupCatalogNewForm from './GroupCatalog/GroupCatalogForm/GroupCatalogNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCatalogs({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content sol--catalogs--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new group catalog
          </h1>
        </div>
        <div className="box-body">
          <GroupCatalogNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen