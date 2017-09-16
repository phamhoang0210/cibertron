import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  channels: [],
  users: [],
  departments: [],

  isFetchingChannels: false,
  isFetchingUsers: false,
  isFetchingDepartments: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CHANNELS: {
      return $$state.merge({
        isFetchingChannels: true,
      })
    }

    case actionTypes.FETCH_CHANNELS_SUCCESS: {
      return $$state.merge({
        isFetchingChannels: false,
        channels: records,
      })
    }

    case actionTypes.FETCH_CHANNELS_FAILURE: {
      return $$state.merge({
        isFetchingChannels: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
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

    case actionTypes.SET_IS_FETCHING_DEPARTMENTS: {
      return $$state.merge({
        isFetchingDepartments: true,
      })
    }

    case actionTypes.FETCH_DEPARTMENTS_SUCCESS: {
      return $$state.merge({
        isFetchingDepartments: false,
        departments: records,
      })
    }

    case actionTypes.FETCH_DEPARTMENTS_FAILURE: {
      return $$state.merge({
        isFetchingDepartments: false,
      })
    }
    
    default: {
      return $$state
    }
  }
}
