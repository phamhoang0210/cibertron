import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import PricesTableBox from './Price/PricesTable/PricesTableBox'
import PriceFiltersFormBox from './Price/PriceFiltersForm/PriceFiltersFormBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const priceParams = getFilterParams(indexState.get('priceFilters'), location)
    actions.fetchPrices(priceParams)
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
    actions.fetchCourses({per_page: 'infinite'})
    actions.fetchCombos({per_page: 'infinite'})
    actions.fetchOrderLevels({per_page: 'infinite'})
    actions.fetchPaymentMethods({per_page: 'infinite'})
  }

  render() {
    const {indexState, intl} = this.props

    return (
      <div className="main-content nauh--leads--new box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'index.title'})}
          </h1>
        </div>
        <div className="box-body">
          <PriceFiltersFormBox {...this.props}/>
          <PricesTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)