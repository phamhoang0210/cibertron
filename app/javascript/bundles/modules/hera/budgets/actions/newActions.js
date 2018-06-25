import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {BUDGETS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingBudget() {
  return {
    type: actionTypes.SET_IS_CREATING_BUDGET,
  }
}

function createBudgetSucces(record) {
  return {
    type: actionTypes.CREATE_BUDGET_SUCCESS,
    record
  }
}

function createBudgetFailure(error) {
  return {
    type: actionTypes.CREATE_BUDGET_FAILURE,
    error,
  }
}

export function createBudget(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingBudget())

    return authRequest
      .submitEntity(`${HERA_BASE_URL}${BUDGETS_API_PATH}`, params)
      .then(res => dispatch(createBudgetSucces(res.data)))
      .catch(error => dispatch(createBudgetFailure(error)))
  }
}