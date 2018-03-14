import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import ListsTableBox from './List/ListsTable/ListsTableBox'
import UnsubscribesTableBox from './List/UnsubscribesTable/UnsubscribesTableBox'
import BouncesTableBox from './List/BouncesTable/BouncesTableBox'
import ListFiltersFormBox from './List/ListFiltersForm/ListFiltersFormBox'
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
    const listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location)
    // listParams["fields"] ="contact_count"
    actions.fetchLists(listParams)
    actions.fetchAllUsers({per_page: 'infinite'})
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
    if(tabKey == 'unsubscribe') {
      const {actions, sharedState, intl} = this.props
      actions.fetchUnsubscribes()
    }
    if(tabKey == 'bounce') {
      const {actions, sharedState, intl} = this.props
      actions.fetchBounces()
    }
    if(tabKey == 'spam') {
      const {actions, index} = this.props
    }
  }

  render() {
    const {indexState, intl} = this.props
    return (
      <div className="main-content nauh--lists box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <ListFiltersFormBox {...this.props}/>
          <Tabs defaultActiveKey="lists" size="large" onChange={this.handleTabChange}>

            <TabPane tab="List" key="lists">
              <ListsTableBox {...this.props}/>
            </TabPane>

            <TabPane tab="Unsubscribe" key="unsubscribe">
              <UnsubscribesTableBox {...this.props}/>
            </TabPane>

            <TabPane tab="Bounce" key="bounce">
              <BouncesTableBox {...this.props}/>
            </TabPane>

            <TabPane tab="Spam Reporter" key="spam">Content of tab 4</TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)