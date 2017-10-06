import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import DomainsTableBox from './Domain/DomainsTable/DomainsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const domainParams = getFilterParams(indexState.get('domainFilters'))
    actions.fetchDomains(domainParams)
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
      <div className="main-content hera-domains">
        <h1 className="main-content-title">Domains</h1>
        <DomainsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen