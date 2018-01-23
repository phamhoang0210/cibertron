import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  prize: null,
  isCreatingPrize: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_PRIZE: {
      return $$state.merge({
        isCreatingPrize: true,
      })
    }

    case actionTypes.CREATE_PRIZE_SUCCESS: {
      return $$state.merge({
        isCreatingPrize: false,
        prize: record,
        alert: createSuccessAlert(`Prize was successfully created.`),
      })
    }

    case actionTypes.CREATE_PRIZE_FAILURE: {
      return $$state.merge({
        isCreatingPrize: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
