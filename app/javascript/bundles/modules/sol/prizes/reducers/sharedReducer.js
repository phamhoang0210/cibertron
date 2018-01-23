import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  courses: [],
  combos: [],
  isFetchingCourses: false,
  isFetchingCombos: false,
})

export default function sharedReducer($$state = initialState, action = null) {

  const { type, record, records, filters, error } = action
  switch (type) {
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
    default: {
      return $$state
    }
  }
}
