import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {BUDGETS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingBudget() {
  return {
    type: actionTypes.SET_IS_FETCHING_BUDGET,
  }
}

function fetchBudgetSuccess(record) {
  return {
    type: actionTypes.FETCH_BUDGET_SUCCESS,
    record,
  }
}

function fetchBudgetFailure(error) {
  return {
    type: actionTypes.FETCH_BUDGET_FAILURE,
    error,
  }
}

export function fetchBudget(budgetId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingBudget())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${BUDGETS_API_PATH}/${budgetId}`, params)
      .then(res => dispatch(fetchBudgetSuccess(res.data)))
      .catch(error => dispatch(fetchBudgetFailure(error)))
  }
}

function setIsUpdatingBudget(budgetId) {
  return {
    type: actionTypes.SET_IS_UPDATING_BUDGET,
    budgetId,
  }
}

function updateBudgetSuccess(record) {
  return {
    type: actionTypes.UPDATE_BUDGET_SUCCESS,
    record,
  }
}

function updateBudgetFailure(error, budgetId) {
  return {
    type: actionTypes.UPDATE_BUDGET_FAILURE,
    error,
    budgetId,
  }
}

export function updateBudget(budgetId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingBudget(budgetId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${BUDGETS_API_PATH}/${budgetId}`, params)
      .then(res => dispatch(updateBudgetSuccess(res.data)))
      .catch(error => dispatch(updateBudgetFailure(error, budgetId)))
  }
}