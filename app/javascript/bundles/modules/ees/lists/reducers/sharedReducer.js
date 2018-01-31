import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
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
  isFetchingUnsubscribes: false,
  isFetchingBounces: false,
  isImportingBounces: false,
  isImportingUnsubscribes: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

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
