import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  lead: null,
  isFetchingLead: false,
  isUpdatingLead: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, leadId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LEAD: {
      return $$state.merge({
        isFetchingLead: true,
        alert: null,
        lead: null,
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
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LEAD: {
      return $$state.merge({
        isUpdatingLead: true,
      })
    }

    case actionTypes.UPDATE_LEAD_SUCCESS: {
      return $$state.merge({
        isUpdatingLead: false,
        alert: createSuccessAlert('Lead was successfully updated'),
      }).update('lead', leadItem => (
        leadItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_LEAD_FAILURE: {
      return $$state.merge({
        isUpdatingLead: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
