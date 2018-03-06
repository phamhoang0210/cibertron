import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import SendersTableBox from './Sender/SendersTable/SendersTableBox'
import BudgetsTableBox from './Sender/BudgetsTable/BudgetsTableBox'
import SenderFiltersFormBox from './Sender/SenderFiltersForm/SenderFiltersFormBox'
import { notification, Tabs } from 'antd'
import { injectIntl } from 'react-intl'

const { TabPane } = Tabs

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, [
      'handleTabChange'
    ])
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

  handleTabChange(tabKey) {
    if(tabKey == 'senders') {
      const {actions, indexState, railsContextState, location} = this.props
      const senderParams = getFilterParamsAndSyncUrl(indexState.get('senderFilters'), location)
      actions.fetchSenders(senderParams)
    }
    if(tabKey == 'budgets') {
      const {actions, indexState, railsContextState, location} = this.props
      const budgetParams = getFilterParamsAndSyncUrl(indexState.get('budgetFilters'), location)
      actions.fetchBudgets(budgetParams)
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
          <Tabs defaultActiveKey="senders" size="large" onChange={this.handleTabChange}>

            <TabPane tab="Senders" key="senders">
              <SendersTableBox {...this.props}/>
            </TabPane>

            <TabPane tab="Budgets" key="budgets">
              <BudgetsTableBox {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)