import React from 'react'
import CategoryNewForm from './Category/CategoryForm/CategoryNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
  }

  render() {
    return (
      <div className="main-content cronus-categories-new">
        <h1 className="main-content-title">Create new category</h1>
        <CategoryNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen