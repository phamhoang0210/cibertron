import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  SENDERS_API_PATH, BUDGETS_API_PATH, AUTHS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSenders() {
  return {
    type: actionTypes.SET_IS_FETCHING_SENDERS,
  }
}

function fetchSendersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SENDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchSendersFailure(error) {
  return {
    type: actionTypes.FETCH_SENDERS_FAILURE,
    error,
  }
}

export function fetchSenders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSenders())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${SENDERS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchSendersSuccess(res.data))
        dispatch(fetchUsers(res.data))
      })
      //.then(res => dispatch(fetchSendersSuccess(res.data)))
      .catch(error => dispatch(fetchSendersFailure(error)))
  }
}

function setIsDeletingSender(senderId) {
  return {
    type: actionTypes.SET_IS_DELETING_SENDER,
    senderId,
  }
}

function deleteSenderSuccess(record) {
  return {
    type: actionTypes.DELETE_SENDER_SUCCESS,
    record,
  }
}

function deleteSenderFailure(error, senderId) {
  return {
    type: actionTypes.DELETE_SENDER_FAILURE,
    error,
    senderId,
  }
}

export function deleteSender(senderId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingSender(senderId))
    authRequest
      .deleteEntity(`${MEEPO_BASE_URL}${SENDERS_API_PATH}/${senderId}`)
      .then(res => {
        dispatch(deleteSenderSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('senderFilters'))
        dispatch(fetchSenders(filterParams))
      })
      .catch(error => dispatch(deleteSenderFailure(error, senderId)))
  }
}

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
      .fetchEntities(`${MEEPO_BASE_URL}${BUDGETS_API_PATH}`, params)
      .then(res => {
        dispatch(fetchBudgetsSuccess(res.data))
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
      .deleteEntity(`${MEEPO_BASE_URL}${BUDGETS_API_PATH}/${budgetId}`)
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
    var list_user_id = []

    if(data.records){
      data.records.map(record => {
        list_user_id.push(record.user_id)
      })
    }
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
      .then(res => {
        dispatch(setIsFetchingUsers())
        var users = res.data.records
        const users_array = {}

        if(users) {
          users.map(user => {
            users_array[user.id] = user.nickname
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["username"] = users_array[record.user_id]
          })
        }
        dispatch(fetchSendersSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}
//Create Budgets
function setIsCreatingBudgets() {
  return {
    type: actionTypes.SET_IS_CREATING_BUDGETS,
  }
}

function createBudgetsSucces(record) {
  return {
    type: actionTypes.CREATE_BUDGETS_SUCCESS,
    record
  }
}

function createBudgetsFailure(error) {
  return {
    type: actionTypes.CREATE_BUDGETS_FAILURE,
    error,
  }
}

export function createBudgets(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingBudgets())

    return authRequest
      .submitEntity(`${MEEPO_BASE_URL}${BUDGETS_API_PATH}`, params)
      .then(res => {
        dispatch(createBudgetsSucces(res.data))
        dispatch(fetchBudgets())
      })
      .catch(error => dispatch(createBudgetsFailure(error)))
  }
}

//Update Budget
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
      .putEntity(`${MEEPO_BASE_URL}${BUDGETS_API_PATH}/${budgetId}`, params)
      .then(res => {dispatch(updateBudgetSuccess(res.data))
      dispatch(fetchBudgets())
    })
      .catch(error => dispatch(updateBudgetFailure(error, budgetId)))
  }
}
