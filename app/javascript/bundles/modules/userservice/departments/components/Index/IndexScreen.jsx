import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import DepartmentTableBox from './Department/DepartmentTable/DepartmentTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const departmentParams = getFilterParams(indexState.get('departmentFilters'))
    actions.fetchDepartments(departmentParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content userservice--departments box">
        <div className="box-header">
          <h1 className="box-title">
            Departments
          </h1>
        </div>
        <div className="box-body">
          <DepartmentTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen