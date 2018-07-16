import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  budgets: [],
  budgetFilters: {
    ...defaultFilters,
    fields: ''
  },
  users: [],
  isFetchingBudgets: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, budgetId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_BUDGETS: {
      return $$state.merge({
        isFetchingBudgets: true,
      })
    }

    case actionTypes.FETCH_BUDGETS_SUCCESS: {
      return $$state.merge({
        isFetchingBudgets: false,
        budgets: records,
        budgetFilters: filters,
      })
    }

    case actionTypes.FETCH_BUDGETS_FAILURE: {
      return $$state.merge({
        isFetchingBudgets: false,
      })
    }

    case actionTypes.SET_IS_DELETING_BUDGET: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_BUDGET_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_BUDGET_FAILURE: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    // Fetch users
    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }

    default: {
      return $$state
    }
  }
}
