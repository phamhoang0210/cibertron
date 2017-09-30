import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  leadLevels: [],
  users: [],
  isFetchingLeadLevels: false,
  isFetchingUsers: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LEAD_LEVELS: {
      return $$state.merge({
        isFetchingLeadLevels: true,
      })
    }

    case actionTypes.FETCH_LEAD_LEVELS_SUCCESS: {
      return $$state.merge({
        isFetchingLeadLevels: false,
        leadLevels: records,
      })
    }

    case actionTypes.FETCH_LEAD_LEVELS_FAILURE: {
      return $$state.merge({
        isFetchingLeadLevels: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }
    
    default: {
      return $$state
    }
  }
}
