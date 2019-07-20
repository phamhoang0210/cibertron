import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import DomainsTableBox from './Domain/DomainsTable/DomainsTableBox'
import DomainsFiltersFormBox from './Domain/DomainsFiltersForm/DomainsFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const domainParams = getFilterParams(indexState.get('domainFilters'))
    actions.fetchDomains(domainParams)
    actions.fetchAllUsers({per_page: 'infinite'})
    actions.fetchPlatforms({per_page: 'infinite'})
    actions.fetchStatusDomainCount()
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
      <div className="main-content hera--domains box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DomainsFiltersFormBox {...this.props}/>
          <DomainsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)