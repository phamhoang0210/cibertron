import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  Budget: null,
  isCreatingBudget: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_BUDGET: {
      return $$state.merge({
        isCreatingBudget: true,        
      })
    }

    case actionTypes.CREATE_BUDGET_SUCCESS: {
      return $$state.merge({
        isCreatingBudget: false,
        Budget: record,
        alert: createSuccessAlert(`Budget was successfully created.`),
      })
    }

    case actionTypes.CREATE_BUDGET_FAILURE: {
      return $$state.merge({
        isCreatingBudget: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
