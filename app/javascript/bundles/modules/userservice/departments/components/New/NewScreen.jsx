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
      <div>
        <h1>Create new department</h1>
        <DepartmentNewForm {...this.props}/>
      </div>
    )
  }
}

export default NewScreen