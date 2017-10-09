import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  discount: null,
  isFetchingDiscount: false,
  isUpdatingDiscount: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, discountId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DISCOUNT: {
      return $$state.merge({
        isFetchingDiscount: true,
        alert: null,
        discount: null,
      })
    }

    case actionTypes.FETCH_DISCOUNT_SUCCESS: {
      return $$state.merge({
        isFetchingDiscount: false,
        discount: record,
      })
    }

    case actionTypes.FETCH_DISCOUNT_FAILURE: {
      return $$state.merge({
        isFetchingDiscount: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_DISCOUNT: {
      return $$state.merge({
        isUpdatingDiscount: true,
      })
    }

    case actionTypes.UPDATE_DISCOUNT_SUCCESS: {
      return $$state.merge({
        isUpdatingDiscount: false,
        alert: createSuccessAlert('Discount was successfully updated'),
      }).update('discount', discountItem => (
        discountItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_DISCOUNT_FAILURE: {
      return $$state.merge({
        isUpdatingDiscount: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
