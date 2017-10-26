import React from 'react'
import DepartmentEditForm from './Department/Form/DepartmentEditForm'

class EditScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDepartment(params.id, {fields: 'company{},sup_department{}'})
    actions.fetchCompanies({per_page: 'infinite'})
    actions.fetchSupDepartments({per_page: 'infinite'})
  }

  render() {
    return (
      <div className="main-content userservice--departments--edit box">
        <div className="box-header">
          <h1 className="box-title">
            Update department
          </h1>
        </div>
        <div className="box-body">
          <DepartmentEditForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default EditScreen