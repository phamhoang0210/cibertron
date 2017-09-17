import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  departments: [],
  roles: [],
  adminroles: [],
  isFetchingDepartments: false,
  isFetchingRoles: false,
  isFetchingAdminroles: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
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

    case actionTypes.SET_IS_FETCHING_ROLES: {
      return $$state.merge({
        isFetchingRoles: true,
      })
    }

    case actionTypes.FETCH_ROLES_SUCCESS: {
      return $$state.merge({
        isFetchingRoles: false,
        roles: records,
      })
    }

    case actionTypes.FETCH_ROLES_FAILURE: {
      return $$state.merge({
        isFetchingRoles: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_ADMINROLES: {
      return $$state.merge({
        isFetchingAdminroles: true,
      })
    }

    case actionTypes.FETCH_ADMINROLES_SUCCESS: {
      return $$state.merge({
        isFetchingAdminroles: false,
        adminroles: records,
      })
    }

    case actionTypes.FETCH_ADMINROLES_FAILURE: {
      return $$state.merge({
        isFetchingAdminroles: false,
      })
    }
    default: {
      return $$state
    }
  }
}
