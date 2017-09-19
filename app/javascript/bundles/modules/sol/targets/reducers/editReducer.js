import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  target: null,
  isFetchingTarget: false,
  isUpdatingTarget: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, targetId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_TARGET: {
      return $$state.merge({
        isFetchingTarget: true,
        alert: null,
        target: null,
      })
    }

    case actionTypes.FETCH_TARGET_SUCCESS: {
      return $$state.merge({
        isFetchingTarget: false,
        target: record,
      })
    }

    case actionTypes.FETCH_TARGET_FAILURE: {
      return $$state.merge({
        isFetchingTarget: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_TARGET: {
      return $$state.merge({
        isUpdatingTarget: true,
      })
    }

    case actionTypes.UPDATE_TARGET_SUCCESS: {
      return $$state.merge({
        isUpdatingTarget: false,
        alert: createSuccessAlert('Target was successfully updated'),
      }).update('target', targetItem => (
        targetItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_TARGET_FAILURE: {
      return $$state.merge({
        isUpdatingTarget: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
