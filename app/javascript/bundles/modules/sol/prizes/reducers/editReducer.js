import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  prize: null,
  prize_codes: [],
  isFetchingPrize: false,
  isUpdatingPrize: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, prizeId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PRIZE: {
      return $$state.merge({
        isFetchingPrize: true,
        alert: null,
        prize: null,
      })
    }

    case actionTypes.FETCH_PRIZE_SUCCESS: {
      return $$state.merge({
        isFetchingPrize: false,
        prize: record,
      })
    }

    case actionTypes.FETCH_PRIZE_FAILURE: {
      return $$state.merge({
        isFetchingPrize: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_PRIZE: {
      return $$state.merge({
        isUpdatingPrize: true,
      })
    }

    case actionTypes.UPDATE_PRIZE_SUCCESS: {
      return $$state.merge({
        isUpdatingPrize: false,
        alert: createSuccessAlert('Prize was successfully updated'),
      }).update('prize', prizeItem => (
        prizeItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_PRIZE_FAILURE: {
      return $$state.merge({
        isUpdatingPrize: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_PRIZE_CODES: {
      return $$state.merge({
        isFetchingPrizeCodes: true,
      })
    }

    case actionTypes.FETCH_PRIZE_CODES_SUCCESS: {
      return $$state.merge({
        isFetchingPrizeCodes: false,
        prize_codes: records,
      })
    }

    case actionTypes.FETCH_PRIZE_CODES_FAILURE: {
      return $$state.merge({
        isFetchingPrizeCodes: false,
      })
    }

    default: {
      return $$state
    }
  }
}
