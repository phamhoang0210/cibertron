import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  allusers: [],
  unsubscribes: [],
  bounces: [],
  unsubscribesFilters: {
    ...defaultFilters,
    fields: ''
  },
  bouncesFilters: {
    ...defaultFilters,
    fields: ''
  },
  userIdMappings: {},
  isFetchingUnsubscribes: false,
  isFetchingAllUsers: false,
  isFetchingBounces: false,
  isImportingBounces: false,
  isImportingUnsubscribes: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  const recordIdMappings = {}
  if(records) {
    records.forEach(record => recordIdMappings[record.id] = record)
  }
  switch (type) {
    case actionTypes.SET_IS_FETCHING_UNSUBSCRIBES: {
      return $$state.merge({
        isFetchingUnsubscribes: true,
      })
    }

    case actionTypes.FETCH_UNSUBSCRIBES_SUCCESS: {
      return $$state.merge({
        isFetchingUnsubscribes: false,
        unsubscribes: records,
        unsubscribesFilters: filters,
      })
    }

    case actionTypes.FETCH_UNSUBSCRIBES_FAILURE: {
      return $$state.merge({
        isFetchingUnsubscribes: false,
      })
    }
    //Fetch all user
    case actionTypes.SET_IS_FETCHING_ALL_USERS: {
      return $$state.merge({
        isFetchingAllUsers: true,
      })
    }

    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingAllUsers: false,
        allusers: records,
        userIdMappings: recordIdMappings,
      })
    }

    case actionTypes.FETCH_ALL_USERS_FAILURE: {
      return $$state.merge({
        isFetchingAllUsers: false,
      })
    }
    case actionTypes.SET_IS_FETCHING_BOUNCES: {
      return $$state.merge({
        isFetchingBounces: true,
      })
    }

    case actionTypes.FETCH_BOUNCES_SUCCESS: {
      return $$state.merge({
        isFetchingBounces: false,
        bounces: records,
        bouncesFilters: filters,
      })
    }

    case actionTypes.FETCH_BOUNCES_FAILURE: {
      return $$state.merge({
        isFetchingBounces: false,
      })
    }

    case actionTypes.SET_IS_IMPORTING_BOUNCES: {
      return $$state.merge({
        isFetchingBounces: true,
      })
    }

    case actionTypes.IMPORT_BOUNCES_SUCCESS: {
      return $$state.merge({
        isFetchingBounces: false,
      })
    }

    case actionTypes.IMPORT_BOUNCES_FAILURE: {
      return $$state.merge({
        isFetchingBounces: false,
      })
    }

    case actionTypes.SET_IS_IMPORTING_UNSUBSCRIBES: {
      return $$state.merge({
        isFetchingUnsubscribes: true,
      })
    }

    case actionTypes.IMPORT_UNSUBSCRIBES_SUCCESS: {
      return $$state.merge({
        isFetchingUnsubscribes: false,
      })
    }

    case actionTypes.IMPORT_UNSUBSCRIBES_FAILURE: {
      return $$state.merge({
        isFetchingUnsubscribes: false,
      })
    }

    default: {
      return $$state
    }
  }
}
