import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  prizes: [],
  prizeFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingPrizes: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, prizeId,
  } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PRIZES: {
      return $$state.merge({
        isFetchingPrizes: true,
      })
    }

    case actionTypes.FETCH_PRIZES_SUCCESS: {
      return $$state.merge({
        isFetchingPrizes: false,
        prizes: records,
        prizeFilters: filters,
      })
    }

    case actionTypes.FETCH_PRIZES_FAILURE: {
      return $$state.merge({
        isFetchingPrizes: false,
      })
    }

    default: {
      return $$state
    }
  }
}
