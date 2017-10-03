import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LandingpagesTableBox from './Landingpage/LandingpagesTable/LandingpagesTableBox'
import LandingpageFiltersFormBox from './Landingpage/LandingpageFiltersForm/LandingpageFiltersFormBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const landingpageParams = getFilterParams(indexState.get('landingpageFilters'))
    actions.fetchLandingpages(landingpageParams)
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
  }

  componentWillReceiveProps(nextProps) {
    const alert = this.props.indexState.get('alert')
    const nextAlert = nextProps.indexState.get('alert')
    if(nextAlert && !nextAlert.equals(alert)) {
      nextAlert.get('messages').forEach(message => {
        notification[nextAlert.get('type')]({
          message: message,
        })
      })
    }
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content cronus-landingpages">
        <h1 className="main-content-title">Landingpages</h1>
        <LandingpageFiltersFormBox {...this.props}/>
        <LandingpagesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen