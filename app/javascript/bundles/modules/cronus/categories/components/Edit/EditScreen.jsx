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
      <div className="main-content cronus--categories--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update category
          </h1>
        </div>
        <div className="box-body">
          <CategoryEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen