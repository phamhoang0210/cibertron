import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import LogsTableBox from './Log/LogsTable/LogsTableBox'
import LogFiltersFormBox from './Log/LogFiltersForm/LogFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const logParams = getFilterParamsAndSyncUrl(indexState.get('logFilters'), location)
    logParams["fields"] = "id, email_open_at, error, created_at, group_name, content, sender, email, status"
    actions.fetchLogs(logParams)
    actions.fetchGroups({"fields": "id, name"})
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
      <div className="main-content ees--logs box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <LogFiltersFormBox {...this.props}/>
          <LogsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)