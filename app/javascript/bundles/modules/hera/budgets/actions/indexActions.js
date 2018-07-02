import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {BUDGETS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingBudgets() {
  return {
    type: actionTypes.SET_IS_FETCHING_BUDGETS,
  }
}

function fetchBudgetsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_BUDGETS_SUCCESS,
    records,
    filters,
  }
}

function fetchBudgetsFailure(error) {
  return {
    type: actionTypes.FETCH_BUDGETS_FAILURE,
    error,
  }
}

export function fetchBudgets(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingBudgets())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${BUDGETS_API_PATH}`, params)
      .then(res => dispatch(fetchBudgetsSuccess(res.data)))
      .catch(error => dispatch(fetchBudgetsFailure(error)))
  }
}

function setIsDeletingBudget(budgetId) {
  return {
    type: actionTypes.SET_IS_DELETING_BUDGET,
    budgetId,
  }
}

function deleteBudgetSuccess(record) {
  return {
    type: actionTypes.DELETE_BUDGET_SUCCESS,
    record,
  }
}

function deleteBudgetFailure(error, budgetId) {
  return {
    type: actionTypes.DELETE_BUDGET_FAILURE,
    error,
    budgetId,
  }
}

export function deleteBudget(budgetId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingBudget(budgetId))
    authRequest
      .deleteEntity(`${HERA_BASE_URL}${BUDGETS_API_PATH}/${budgetId}`)
      .then(res => {
        dispatch(deleteBudgetSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('budgetFilters'))
        dispatch(fetchBudgets(filterParams))
      })
      .catch(error => dispatch(deleteBudgetFailure(error, budgetId)))
  }
}