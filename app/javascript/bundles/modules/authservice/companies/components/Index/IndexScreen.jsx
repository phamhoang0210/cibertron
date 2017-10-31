import React from 'react'
import { getFilterParams, notify } from 'helpers/applicationHelper'
import CompanyTableBox from './Company/CompanyTable/CompanyTableBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, location} = this.props
    const companyParams = getFilterParams(indexState.get('companyFilters'), location)
    actions.fetchCompanies(companyParams)
  }

  componentWillReceiveProps(nextProps) {
    const noti = this.props.indexState.get('notification')
    const nextNoti = nextProps.indexState.get('notification')
    notify(noti, nextNoti)
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content authservice--companies box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <CompanyTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)