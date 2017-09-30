import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import PromosTableBox from './Promo/PromosTable/PromosTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState} = this.props
    const promoParams = getFilterParams(indexState.get('promoFilters'))
    actions.fetchPromos(promoParams)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Promos</h1>
        <PromosTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen