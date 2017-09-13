import React from 'react'
import DepartmentEditForm from './Department/Form/DepartmentEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDepartment(params.id)
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    return (
      <div>
        <h1>Update department</h1>
        <DepartmentEditForm {...this.props}/>
      </div>
    )
  }
}

export default EditScreen