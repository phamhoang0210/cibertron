import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import LandingPagesTableBox from './LandingPage/LandingPagesTable/LandingPagesTableBox'
import LandingPageFiltersFormBox from './LandingPage/LandingPageFiltersForm/LandingPageFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, intl} = this.props
    const landingPageParams = getFilterParams(indexState.get('landingPageFilters'))
    
    actions.fetchLandingPages(landingPageParams)
    actions.fetchDiscounts({per_page: 'infinite', fields: 'product_json'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchDomains({per_page: 'infinite'})
    actions.fetchEditorLinks({fields: 'platform{}'})
    actions.fetchPlatforms()
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
    const {indexState, intl} = this.props
    return (
      <div className="main-content hera--landing-pages box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <LandingPageFiltersFormBox {...this.props}/>
          <LandingPagesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)