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
      <div>
        <h1>Create new category</h1>
        <CategoryNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen