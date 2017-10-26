import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  users: [],
  courses: [], 
  combos: [],
  campaigns: [],
  provinces: [],
  orderLevels: [],
  campaignIdCodeMappings: {},
  comboSourceIdMappings: {},
  courseSourceIdMappings: {},
  isFetchingUsers: false,
  isFetchingCourses: false,
  isFetchingCombos: false,
  isFetchingCampaigns: false,
  isFetchingProvinces: false,
  isFetchingOrderLevels: false,
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
      const courseSourceIdMappings = {}
      records.forEach(record => courseSourceIdMappings[record.source_id] = record)

      return $$state.merge({
        isFetchingCourses: false,
        courses: records,
        courseSourceIdMappings,
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
      const comboSourceIdMappings = {}
      records.forEach(record => comboSourceIdMappings[record.code] = record)

      return $$state.merge({
        isFetchingCombos: false,
        combos: records,
        comboSourceIdMappings,
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
    
    case actionTypes.SET_IS_FETCHING_PROVINCES: {
      return $$state.merge({
        isFetchingProvinces: true,
      })
    }
    
    case actionTypes.FETCH_PROVINCES_SUCCESS: {
      return $$state.merge({
        isFetchingProvinces: false,
        provinces: records,
      })
    }
    
    case actionTypes.FETCH_PROVINCES_FAILURE: {
      return $$state.merge({
        isFetchingProvinces: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_ORDER_LEVELS: {
      return $$state.merge({
        isFetchingOrderLevels: true,
      })
    }

    case actionTypes.FETCH_ORDER_LEVELS_SUCCESS: {
      return $$state.merge({
        isFetchingOrderLevels: false,
        orderLevels: records,
      })
    }

    case actionTypes.FETCH_ORDER_LEVELS_FAILURE: {
      return $$state.merge({
        isFetchingOrderLevels: false,
      })
    }

    default: {
      return $$state
    }
  }
}
