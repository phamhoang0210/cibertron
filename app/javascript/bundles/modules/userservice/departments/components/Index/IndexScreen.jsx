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
      <div className="main-content userservice-departments">
        <h1 className="main-content-title">Departments</h1>
        <DepartmentTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen