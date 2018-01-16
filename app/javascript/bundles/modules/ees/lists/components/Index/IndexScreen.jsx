import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import ListsTableBox from './List/ListsTable/ListsTableBox'
import ListFiltersFormBox from './List/ListFiltersForm/ListFiltersFormBox'
import { notification } from 'antd'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const listParams = getFilterParamsAndSyncUrl(indexState.get('listFilters'), location)
    // listParams["fields"] ="contact_count"
    actions.fetchLists(listParams)
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
      <div className="main-content nauh--lists box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <ListFiltersFormBox {...this.props}/>
          <ListsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)