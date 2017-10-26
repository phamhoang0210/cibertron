import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import CombosTableBox from './Combo/CombosTable/CombosTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const comboParams = getFilterParams(indexState.get('comboFilters'))
    actions.fetchCombos(comboParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div className="main-content sol--combos box">
        <div className="box-header">
          <h1 className="box-title">
            Combos
          </h1>
        </div>
        <div className="box-body">
          <CombosTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen