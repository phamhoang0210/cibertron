import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LandingPagesTableBox from './LandingPage/LandingPagesTable/LandingPagesTableBox'
import LandingPageFiltersFormBox from './LandingPage/LandingPageFiltersForm/LandingPageFiltersFormBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    actions.fetchLandingPages(landingPageParams)
    actions.fetchDiscounts({per_page: 'infinite', fields: 'product_json'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchDomains({per_page: 'infinite'})
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
      <div className="main-content hera-landingPages">
        <h1 className="main-content-title">LandingPages</h1>
        <LandingPageFiltersFormBox {...this.props}/>
        <LandingPagesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen