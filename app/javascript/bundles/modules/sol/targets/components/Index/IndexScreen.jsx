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
      <div>
        <h1>Courses</h1>
        <CoursesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen