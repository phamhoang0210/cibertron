import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  users: [],
  courses: [], 
  combos: [],
  campaigns: [],
  campaignIdCodeMappings: {},
  isFetchingUsers: false,
  isFetchingCourses: false,
  isFetchingCombos: false,
  isFetchingCampaigns: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
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
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
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
    
    case actionTypes.SET_IS_FETCHING_CAMPAIGNS: {
      return $$state.merge({
        isFetchingCampaigns: false,
      })
    }
    
    case actionTypes.FETCH_CAMPAIGNS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaigns: false,
        campaigns: records,
      })
    }
    
    case actionTypes.FETCH_CAMPAIGNS_FAILURE: {
      return $$state.merge({
        isFetchingCampaigns: false,
      })
    }

    default: {
      return $$state
    }
  }
}
