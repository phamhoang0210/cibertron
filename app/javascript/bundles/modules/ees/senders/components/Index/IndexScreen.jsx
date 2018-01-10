import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import SendersTableBox from './Sender/SendersTable/SendersTableBox'
import SenderFiltersFormBox from './Sender/SenderFiltersForm/SenderFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const senderParams = getFilterParamsAndSyncUrl(indexState.get('senderFilters'), location)
    
    actions.fetchSenders(senderParams)
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
      <div className="main-content ees--senders box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <SenderFiltersFormBox {...this.props}/>
          <SendersTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)