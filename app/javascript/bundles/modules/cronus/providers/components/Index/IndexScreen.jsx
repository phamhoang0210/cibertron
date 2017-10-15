import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import ProvidersTableBox from './Provider/ProvidersTable/ProvidersTableBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const providerParams = getFilterParams(indexState.get('providerFilters'))
    actions.fetchProviders(providerParams)
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
      <div className="main-content cronus-providers">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'index.title'})}
        </h1>
        <ProvidersTableBox {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)