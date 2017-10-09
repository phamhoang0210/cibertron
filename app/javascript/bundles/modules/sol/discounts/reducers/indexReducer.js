import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  discounts: [],
  discountFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingDiscounts: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, discountId,
  } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DISCOUNTS: {
      return $$state.merge({
        isFetchingDiscounts: true,
      })
    }

    case actionTypes.FETCH_DISCOUNTS_SUCCESS: {
      return $$state.merge({
        isFetchingDiscounts: false,
        discounts: records,
        discountFilters: filters,
      })
    }

    case actionTypes.FETCH_DISCOUNTS_FAILURE: {
      return $$state.merge({
        isFetchingDiscounts: false,
      })
    }

    default: {
      return $$state
    }
  }
}
