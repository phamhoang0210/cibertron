import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  order: null,
  isFetchingOrder: false,
  isUpdatingOrder: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, orderId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ORDER: {
      return $$state.merge({
        isFetchingOrder: true,
        alert: null,
        order: null,
      })
    }

    case actionTypes.FETCH_ORDER_SUCCESS: {
      return $$state.merge({
        isFetchingOrder: false,
        order: record,
      })
    }

    case actionTypes.FETCH_ORDER_FAILURE: {
      return $$state.merge({
        isFetchingOrder: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_ORDER: {
      return $$state.merge({
        isUpdatingOrder: true,
      })
    }

    case actionTypes.UPDATE_ORDER_SUCCESS: {
      return $$state.merge({
        isUpdatingOrder: false,
        alert: createSuccessAlert('Order was successfully updated'),
      }).update('order', orderItem => (
        orderItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_ORDER_FAILURE: {
      return $$state.merge({
        isUpdatingOrder: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
