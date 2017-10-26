import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import CatalogsTableBox from './Catalog/CatalogsTable/CatalogsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const catalogParams = getFilterParamsAndSyncUrl(indexState.get('catalogFilters'),location )
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
    return (
      <div className="main-content sol--catalogs box">
        <div className="box-header">
          <h1 className="box-title">
            Catalogs
          </h1>
        </div>
        <div className="box-body">
          <CatalogsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen
