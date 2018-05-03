import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  price: null,
  isFetchingPrice: false,
  isUpdatingPrice: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, priceId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PRICE: {
      return $$state.merge({
        isFetchingPrice: true,
        alert: null,
        price: null,
      })
    }

    case actionTypes.FETCH_PRICE_SUCCESS: {
      return $$state.merge({
        isFetchingPrice: false,
        price: record,
      })
    }

    case actionTypes.FETCH_PRICE_FAILURE: {
      return $$state.merge({
        isFetchingPrice: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_PRICE: {
      return $$state.merge({
        isUpdatingPrice: true,
      })
    }

    case actionTypes.UPDATE_PRICE_SUCCESS: {
      return $$state.merge({
        isUpdatingPrice: false,
        alert: createSuccessAlert('Price was successfully updated'),
      }).update('price', priceItem => (
        priceItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_PRICE_FAILURE: {
      return $$state.merge({
        isUpdatingPrice: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
