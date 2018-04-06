import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import LogsTableBox from './Log/LogsTable/LogsTableBox'
import LogFiltersFormBox from './Log/LogFiltersForm/LogFiltersFormBox'
import EmailsTableBox from './Log/EmailsTable/EmailsTableBox'
import { notification,Tabs } from 'antd'
import { injectIntl } from 'react-intl'


const { TabPane } = Tabs
class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleTabChange'
    ])

    this.state = {
      tabKey: "emails"
    }
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const emailParams = getFilterParamsAndSyncUrl(indexState.get('emailFilters'), location)

    let gte = (new Date().toISOString().split('T')[0])+' 00:00:00'
    let lt = (new Date().toISOString().split('T')[0])+' 23:59:59'
    let created_at = {"gte":gte, "lt":lt}

    emailParams["fields"] = "id, email, c_obj, open_at, error,status,created_at,user_id"
    emailParams["created_at"] = created_at
    
    actions.fetchEmails(emailParams)
    actions.fetchCampaigns({"fields": "id, name"})
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
  handleTabChange(tabKey) {
    if(tabKey == 'logs') {
      const {actions, indexState, railsContextState, location} = this.props
      const logParams = getFilterParamsAndSyncUrl(indexState.get('logFilters'), location)
      logParams["fields"] = "id, email_open_at, error, created_at, group_name, content, sender, email, status"
      this.setState({
        tabKey: tabKey
      })
      actions.fetchLogs(logParams)
      actions.fetchGroups({"fields": "id, name"})
    }
    if(tabKey == 'emails') {
      const {actions, indexState, railsContextState, location} = this.props
      const emailParams = getFilterParamsAndSyncUrl(indexState.get('emailFilters'), location)
      this.setState({
        tabKey:tabKey
      })
      emailParams["fields"] = "id, email, c_obj, open_at, error,status,created_at,user_id"
      actions.fetchEmails(emailParams)
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
          <LogFiltersFormBox {...this.props} tabKey={this.state.tabKey}/>
          <Tabs defaultActiveKey="system" size="large" onChange={this.handleTabChange}>
            <TabPane tab="Marketing" key="emails">
              <EmailsTableBox {...this.props}/>
            </TabPane>
            <TabPane tab="Systems" key="logs">
              <LogsTableBox {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)