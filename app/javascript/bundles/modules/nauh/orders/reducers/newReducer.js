import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  order: null,
  isCreatingOrder: false,
  isFetchingLead: false,
  lead: null,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_ORDER: {
      return $$state.merge({
        isCreatingOrder: true,
      })
    }

    case actionTypes.CREATE_ORDER_SUCCESS: {
      return $$state.merge({
        isCreatingOrder: false,
        order: record,
        alert: createSuccessAlert(`Order was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_ORDER_FAILURE: {
      return $$state.merge({
        isCreatingOrder: false,
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
