import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  target: null,
  isCreatingTarget: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_TARGET: {
      return $$state.merge({
        isCreatingTarget: true,
      })
    }

    case actionTypes.CREATE_TARGET_SUCCESS: {
      return $$state.merge({
        isCreatingTarget: false,
        target: record,
        alert: createSuccessAlert('Target was successfully created'),
      })
    }

    case actionTypes.CREATE_TARGET_FAILURE: {
      return $$state.merge({
        isCreatingTarget: false,
        alert: {
          messages: ['Create Target failed'],
          type: 'error'
        }
      })
    }

    default: {
      return $$state
    }
  }
}
