import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import OrdersTableBox from './Order/OrdersTable/OrdersTableBox'
import OrderFiltersFormBox from './Order/OrderFiltersForm/OrderFiltersFormBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {actions, indexState, railsContextState} = this.props
    const orderParams = getFilterParams(indexState.get('orderFilters'))
    actions.fetchOrders(orderParams)
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchUsers({per_page: 'infinite'})
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>Orders</h1>
        <OrderFiltersFormBox {...this.props}/>
        <OrdersTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen