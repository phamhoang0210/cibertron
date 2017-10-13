import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CatalogsTableBox from './Catalog/CatalogsTable/CatalogsTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const catalogParams = getFilterParams(indexState.get('catalogFilters'))
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
      <div className="main-content nauh-catalogs">
        <h1 className="main-content-title">Catalogs</h1>
        <CatalogsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen
