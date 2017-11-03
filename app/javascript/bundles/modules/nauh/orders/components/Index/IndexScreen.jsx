import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import OrdersTableBox from './Order/OrdersTable/OrdersTableBox'
import OrderFiltersFormBox from './Order/OrderFiltersForm/OrderFiltersFormBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const orderParams = getFilterParams(indexState.get('orderFilters'), location)
    actions.fetchOrders(orderParams)
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
          <OrderFiltersFormBox {...this.props}/>
          <OrdersTableBox {...this.props}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)