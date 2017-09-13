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
      <div>
        <h1>Update category</h1>
        <CategoryEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen