import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import GroupCatalogsTableBox from './GroupCatalog/GroupCatalogsTable/GroupCatalogsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    console.log('props', this.props)
    const catalogParams = getFilterParamsAndSyncUrl(indexState.get('catalogFilters'),location)
    actions.fetchCatalogs(catalogParams)
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
    console.log('Ahihi')
    return (
      <div className="main-content sol--catalogs box">
        <div className="box-header">
          <h1 className="box-title">
            Group Catalogs
          </h1>
        </div>
        <div className="box-body">
          <GroupCatalogsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen
