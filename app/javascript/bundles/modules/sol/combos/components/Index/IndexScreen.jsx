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
      <div>
        <h1>Combos</h1>
        <CombosTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen