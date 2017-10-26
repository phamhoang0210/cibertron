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
      <div className="main-content sol--promos box">
        <div className="box-header">
          <h1 className="box-title">
            Promos
          </h1>
        </div>
        <div className="box-body">
          <PromosTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default IndexScreen