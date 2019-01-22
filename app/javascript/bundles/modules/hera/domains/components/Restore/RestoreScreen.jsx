import React from 'react'
import DomainRestoreForm from './Domain/Form/DomainRestoreForm'
import { injectIntl } from 'react-intl'

class RestoreScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDomain(params.id, {fields: 'landing_page{}'})
    actions.fetchSwapDomains({per_page: 'infinite', status: {in: ["ACTIVE", "PENDING"]}})
  }

  render() {
    const {intl} = this.props

    return (
      <div className="main-content hera--domains--Restore box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'restore.title'})}
          </h1>
        </div>
        <div className="box-body">
          <DomainRestoreForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(RestoreScreen)