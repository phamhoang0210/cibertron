import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CategoriesTableBox from './Category/CategoriesTable/CategoriesTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const categoryParams = getFilterParams(indexState.get('categoryFilters'))
    actions.fetchCategories(categoryParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Categories</h1>
        <CategoriesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen