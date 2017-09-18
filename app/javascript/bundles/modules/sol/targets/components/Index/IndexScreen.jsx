import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import TargetsTableBox from './Target/TargetsTable/TargetsTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const targetParams = getFilterParams(indexState.get('targetFilters'))
    actions.fetchTargets(targetParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Targets</h1>
        <TargetsTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen