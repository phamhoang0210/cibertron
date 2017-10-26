import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CoursesTableBox from './Course/CoursesTable/CoursesTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const courseParams = getFilterParams(indexState.get('courseFilters'))
    actions.fetchCourses(courseParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content sol--courses box">
        <div className="box-header">
          <h1 className="box-title">
            Courses
          </h1>
        </div>
        <div className="box-body">
          <CoursesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen