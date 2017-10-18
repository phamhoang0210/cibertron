import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  sources: [],
  sourceFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingSources: false,
  isHandingOver: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, sourceId,
  } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_SOURCES: {
      return $$state.merge({
        isFetchingSources: true,
      })
    }

    case actionTypes.FETCH_SOURCES_SUCCESS: {
      return $$state.merge({
        isFetchingSources: false,
        sources: records,
        sourceFilters: filters,
      })
    }

    case actionTypes.FETCH_SOURCES_FAILURE: {
      return $$state.merge({
        isFetchingSources: false,
      })
    }

    case actionTypes.SET_IS_HANDING_OVER: {
      return $$state.merge({
        isHandingOver: true,
      })
    }

    case actionTypes.HAND_OVER_SUCCESS: {
      return $$state.merge({
        isHandingOver: false,
      })
    }

    case actionTypes.HAND_OVER_FAILURE: {
      return $$state.merge({
        isHandingOver: false,
      })
    }

    default: {
      return $$state
    }
  }
}
