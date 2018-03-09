import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  logs: [],
  groups: [],
  logFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingLogs: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, logId
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LOGS: {
      return $$state.merge({
        isFetchingLogs: true,
      })
    }

    case actionTypes.FETCH_LOGS_SUCCESS: {
      return $$state.merge({
        isFetchingLogs: false,
        logs: records,
        logFilters: filters,
      })
    }

    case actionTypes.FETCH_LOGS_FAILURE: {
      return $$state.merge({
        isFetchingLogs: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_GROUPS: {
      return $$state.merge({
        isFetchingGroups: true,
      })
    }

    case actionTypes.FETCH_GROUPS_SUCCESS: {
      return $$state.merge({
        isFetchingGroups: false,
        groups: records,
        groupFilters: filters,
      })
    }

    case actionTypes.FETCH_GROUPS_FAILURE: {
      return $$state.merge({
        isFetchingGroups: false,
      })
    }

    default: {
      return $$state
    }
  }
}
