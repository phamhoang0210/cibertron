import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  role: null,
  isFetchingRole: false,
  isUpdatingRole: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, roleId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ROLE: {
      return $$state.merge({
        isFetchingRole: true,
        alert: null,
        role: null,
      })
    }

    case actionTypes.FETCH_ROLE_SUCCESS: {
      return $$state.merge({
        isFetchingRole: false,
        role: record,
      })
    }

    case actionTypes.FETCH_ROLE_FAILURE: {
      return $$state.merge({
        isFetchingRole: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_ROLE: {
      return $$state.merge({
        isUpdatingRole: true,
      })
    }

    case actionTypes.UPDATE_ROLE_SUCCESS: {
      return $$state.merge({
        isUpdatingRole: false,
        role: record,
        alert: createSuccessAlert('Role was successfully updated'),
      }).update('role', roleItem => (
        roleItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_ROLE_FAILURE: {
      return $$state.merge({
        isUpdatingRole: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
