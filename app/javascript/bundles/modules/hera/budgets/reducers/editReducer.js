import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  budget: null,
  isFetchingBudget: false,
  isUpdatingBudget: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, budgetId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_BUDGET: {
      return $$state.merge({
        isFetchingBudget: true,
        alert: null,
        budget: null,
      })
    }

    case actionTypes.FETCH_BUDGET_SUCCESS: {
      return $$state.merge({
        isFetchingBudget: false,
        budget: record,
      })
    }

    case actionTypes.FETCH_BUDGET_FAILURE: {
      return $$state.merge({
        isFetchingBudget: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_BUDGET: {
      return $$state.merge({
        isUpdatingBudget: true,
      })
    }

    case actionTypes.UPDATE_BUDGET_SUCCESS: {
      return $$state.merge({
        isUpdatingBudget: false,
        alert: createSuccessAlert('Budget was successfully updated'),
      }).update('budget', budgetItem => (
        budgetItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_BUDGET_FAILURE: {
      return $$state.merge({
        isUpdatingBudget: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
