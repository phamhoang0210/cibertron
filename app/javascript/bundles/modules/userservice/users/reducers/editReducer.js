import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  user: null,
  isFetchingUser: false,
  isUpdatingUser: false
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, userId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_USER: {
      return $$state.merge({
        isFetchingUser: true,
        alert: null,
        user: null,
      })
    }

    case actionTypes.FETCH_USER_SUCCESS: {
      return $$state.merge({
        isFetchingUser: false,
        user: record,
      })
    }

    case actionTypes.FETCH_USER_FAILURE: {
      return $$state.merge({
        isFetchingUser: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_USER: {
      return $$state.merge({
        isUpdatingUser: true,
      })
    }

    case actionTypes.UPDATE_USER_SUCCESS: {
      return $$state.merge({
        isUpdatingUser: false,
        user: record,
        alert: createSuccessAlert('User was successfully updated'),
      }).update('user', userItem => (
        userItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_USER_FAILURE: {
      return $$state.merge({
        isUpdatingUser: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
