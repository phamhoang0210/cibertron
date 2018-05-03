import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  price: null,
  isCreatingPrice: false,
  isFetchingLead: false,
  lead: null,
  paymentMethods: []
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_PRICE: {
      return $$state.merge({
        isCreatingPrice: true,
      })
    }

    case actionTypes.CREATE_PRICE_SUCCESS: {
      return $$state.merge({
        isCreatingPrice: false,
        price: record,
        alert: createSuccessAlert(`Price was successfully created.`),
      })
    }

    case actionTypes.CREATE_PRICE_FAILURE: {
      return $$state.merge({
        isCreatingPrice: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_LEAD: {
      return $$state.merge({
        isFetchingLead: true,
      })
    }

    case actionTypes.FETCH_LEAD_SUCCESS: {
      return $$state.merge({
        isFetchingLead: false,
        lead: record,
      })
    }

    case actionTypes.FETCH_LEAD_FAILURE: {
      return $$state.merge({
        isFetchingLead: false,
      })
    }

    default: {
      return $$state
    }
  }
}
