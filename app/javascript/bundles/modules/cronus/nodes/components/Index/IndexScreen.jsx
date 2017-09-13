import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import NodesTableBox from './Node/NodesTable/NodesTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const nodeParams = getFilterParams(indexState.get('nodeFilters'))
    actions.fetchNodes(nodeParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Nodes</h1>
        <NodesTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen