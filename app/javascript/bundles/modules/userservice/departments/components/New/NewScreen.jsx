import React from 'react'
import DepartmentNewForm from './Department/DepartmentForm/DepartmentNewForm'

class NewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchCompanies({per_page: 'infinite'})
    actions.fetchSupDepartments({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content userservice--departments--new box">
        <div className="box-header">
          <h1 className="box-title">
            Create new department
          </h1>
        </div>
        <div className="box-body">
          <DepartmentNewForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default NewScreen