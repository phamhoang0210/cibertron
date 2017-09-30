import React from 'react'
import CategoryEditForm from './Category/Form/CategoryEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCategory(params.id)
  }

  render() {
    return (
      <div className="main-content cronus-categories-edit">
        <h1 className="main-content-title">Update category</h1>
        <CategoryEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen