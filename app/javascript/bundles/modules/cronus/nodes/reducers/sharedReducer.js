import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  channels: [],
  users: [],
  departments: [],
  courses: [],
  combos: [],
  targets: [],

  isFetchingChannels: false,
  isFetchingUsers: false,
  isFetchingDepartments: false,
  isFetchingCourses: false,
  isFetchingCombos: false,
  isFetchingTargets: false,
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

    case actionTypes.SET_IS_FETCHING_COURSES: {
      return $$state.merge({
        isFetchingCourses: true,
      })
    }

    case actionTypes.FETCH_COURSES_SUCCESS: {
      return $$state.merge({
        isFetchingCourses: false,
        courses: records,
      })
    }

    case actionTypes.FETCH_COURSES_FAILURE: {
      return $$state.merge({
        isFetchingCourses: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_COMBOS: {
      return $$state.merge({
        isFetchingCombos: true,
      })
    }

    case actionTypes.FETCH_COMBOS_SUCCESS: {
      return $$state.merge({
        isFetchingCombos: false,
        combos: records,
      })
    }

    case actionTypes.FETCH_COMBOS_FAILURE: {
      return $$state.merge({
        isFetchingCombos: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_TARGETS: {
      return $$state.merge({
        isFetchingTargets: true,
      })
    }

    case actionTypes.FETCH_TARGETS_SUCCESS: {
      return $$state.merge({
        isFetchingTargets: false,
        targets: records,
      })
    }

    case actionTypes.FETCH_TARGETS_FAILURE: {
      return $$state.merge({
        isFetchingTargets: false,
      })
    }
    
    default: {
      return $$state
    }
  }
}
