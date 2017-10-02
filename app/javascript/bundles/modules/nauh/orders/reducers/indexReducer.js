import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  orders: [],
  orderFilters: {
    ...defaultFilters,
    fields: 'lead{}'
  },
  isFetchingOrders: false
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, orderId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ORDERS: {
      return $$state.merge({
        isFetchingOrders: true,
      })
    }

    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return $$state.merge({
        isFetchingOrders: false,
        orders: records,
        orderFilters: filters,
      })
    }

    case actionTypes.FETCH_ORDERS_FAILURE: {
      return $$state.merge({
        isFetchingOrders: false,
      })
    }

    case actionTypes.SET_IS_DELETING_ORDER: {
      return $$state.withMutations(state => (
        state.update('orders', orders => (
          orders.update(
            orders.findIndex(c => c.get('id') == orderId),
            orderItem => (
              orderItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_ORDER_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('orders', orders => (
          orders.update(
            orders.findIndex(c => c.get('id') == orderId),
            orderItem => (
              orderItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_ORDER_FAILURE: {
      return $$state.withMutations(state => (
        state.update('orders', orders => (
          orders.update(
            orders.findIndex(c => c.get('id') == orderId),
            orderItem => (
              orderItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    default: {
      return $$state
    }
  }
}
