import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  sources: [],
  selectedSourceKeys: [],
  sourceFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingSources: false,
  isHandingOver: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, sourceId, sourceKeys, data
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

    case actionTypes.UPDATE_SELECTED_SOURCE_KEYS: {
      return $$state.merge({
        selectedSourceKeys: sourceKeys,
      })
    }

    case actionTypes.SET_IS_FETCHING_L8_REPORT: {
      return $$state.withMutations(state => (
        state.update('sources', sources => (
          sources.map(source => source.set('l8_count', 'loading'))
        ))
      ))
    }

    case actionTypes.FETCH_L8_REPORT_SUCESS: {
      return $$state.withMutations(state => (
        state.update('sources', sources => (
          sources.map(source => {
            const l8Count = data[source.get('mobile')] ? data[source.get('mobile')]['l8'] : 0
            return source.set('l8_count', l8Count)
          })
        ))
      ))

      return $$state
    }

    case actionTypes.FETCH_L8_REPORT_FAILURE: {
      return $$state.withMutations(state => (
        state.update('sources', sources => (
          sources.map(source => source.set('l8_count', null))
        ))
      ))
      return $$state
    }

    default: {
      return $$state
    }
  }
}
