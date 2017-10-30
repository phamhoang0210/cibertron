import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  users: [],
  userFilters: {
    ...defaultFilters,
    fields: 'basic_profile{}'
  },
  isFetchingUsers: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, userId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
        userFilters: filters,
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
