import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import NodesTableBox from './Node/NodesTable/NodesTableBox'
import { notification } from 'antd'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const nodeParams = getFilterParams(indexState.get('nodeFilters'))
    actions.fetchNodes(nodeParams)
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
      <div className="main-content cronus-nodes">
        <h1 className="main-content-title">Nodes</h1>
        <NodesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen