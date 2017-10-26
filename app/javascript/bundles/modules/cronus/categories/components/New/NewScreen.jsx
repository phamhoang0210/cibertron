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
      <div className="main-content cronus--categories--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new category
          </h1>
        </div>
        <div className="box-body">
          <CategoryNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen