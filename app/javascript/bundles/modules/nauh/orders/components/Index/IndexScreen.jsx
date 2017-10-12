import React from 'react'
import { getFilterParamsAndSyncUrl } from 'helpers/applicationHelper'
import OrdersTableBox from './Order/OrdersTable/OrdersTableBox'
import OrderFiltersFormBox from './Order/OrderFiltersForm/OrderFiltersFormBox'
import { injectIntl } from 'react-intl'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState, location} = this.props
    const orderParams = getFilterParamsAndSyncUrl(indexState.get('orderFilters'), location)
    actions.fetchOrders(orderParams)
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    const {indexState, intl} = this.props

    return (
      <div className="main-content nauh-orders-index">
        <h1 className="main-content-title">
          {intl.formatMessage({id: 'index.title'})}
        </h1>
        <OrderFiltersFormBox {...this.props}/>
        <OrdersTableBox {...this.props}/>
      </div>
    )
  }
}

export default injectIntl(IndexScreen)