import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import SourcesTableBox from './Source/SourcesTable/SourcesTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const sourceParams = getFilterParams(indexState.get('sourceFilters'))
    actions.fetchSources(sourceParams)
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
      <div className="main-content nauh-sources">
        <h1 className="main-content-title">Sources</h1>
        <SourcesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen