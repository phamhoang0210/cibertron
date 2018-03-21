import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  senders: [],
  budgets: [],
  senderFilters: {
    ...defaultFilters,
    fields: ''
  },
  budgetFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingSenders: false,
  isUpdatingSenders: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, senderId,budgetId,
    sender
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_SENDERS: {
      return $$state.merge({
        isFetchingSenders: true,
      })
    }

    case actionTypes.FETCH_SENDERS_SUCCESS: {
      return $$state.merge({
        isFetchingSenders: false,
        senders: records,
        senderFilters: filters,
      })
    }

    case actionTypes.FETCH_SENDERS_FAILURE: {
      return $$state.merge({
        isFetchingSenders: false,
      })
    }

    case actionTypes.SET_IS_DELETING_SENDER: {
      return $$state.withMutations(state => (
        state.update('senders', senders => (
          senders.update(
            senders.findIndex(c => c.get('id') == senderId),
            senderItem => (
              senderItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_SENDER_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('senders', senders => (
          senders.update(
            senders.findIndex(c => c.get('id') == senderId),
            senderItem => (
              senderItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_SENDER_FAILURE: {
      return $$state.withMutations(state => (
        state.update('senders', senders => (
          senders.update(
            senders.findIndex(c => c.get('id') == senderId),
            senderItem => (
              senderItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

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
    case actionTypes.SET_IS_UPDATING_BUDGET: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isUpdating: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.UPDATE_BUDGET_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isUpdating: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.UPDATE_BUDGET_FAILURE: {
      return $$state.withMutations(state => (
        state.update('budgets', budgets => (
          budgets.update(
            budgets.findIndex(c => c.get('id') == budgetId),
            budgetItem => (
              budgetItem.merge({
                isUpdating: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    default: {
      return $$state
    }
  }
}
