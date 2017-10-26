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
      <div className="main-content sol--targets box">
        <div className="box-header">
          <h1 className="box-title">
            Targets
          </h1>
        </div>
        <div className="box-body">
          <TargetsTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen