import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {BUDGETS_API_PATH, AUTHS_API_PATH, USERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'
import _ from 'lodash'

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
      .then(res => {
        dispatch(fetchUsers(res.data))
      })
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


// Fetch users
function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess() {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}


export function fetchUsers(data) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    var list_staff_gid = []

    if(data.records){
      data.records.map(record => {
        list_staff_gid.push(record.staff_gid)
      })
    }
    console.log(list_staff_gid, "list_user_gid")
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, {
        'compconds': {
          'gid.in': _.compact(_.uniq(list_staff_gid))
      }})
      .then(res => {
        var users = res.data.records
        const users_array = {}
        if(users) {
          users.map(user => {
            users_array[user.gid] = user.account_uid
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["staff_email"] = users_array[record.staff_gid] || record.staff_email
          })
        }
        dispatch(fetchUsersSuccess())
        dispatch(fetchBudgetsSuccess(data))
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}