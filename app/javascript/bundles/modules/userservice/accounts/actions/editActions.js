import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL, ACCOUNTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingAccount() {
  return {
    type: actionTypes.SET_IS_FETCHING_ACCOUNT,
  }
}

function fetchAccountSuccess(record) {
  return {
    type: actionTypes.FETCH_ACCOUNT_SUCCESS,
    record,
  }
}

function fetchAccountFailure(error) {
  return {
    type: actionTypes.FETCH_ACCOUNT_FAILURE,
    error,
  }
}

export function fetchAccount(accountId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAccount())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ACCOUNTS_API_PATH}/${accountId}`, params)
      .then(res => dispatch(fetchAccountSuccess(res.data)))
      .catch(error => dispatch(fetchAccountFailure(error)))
  }
}

function setIsUpdatingAccount(accountId) {
  return {
    type: actionTypes.SET_IS_UPDATING_ACCOUNT,
    accountId,
  }
}

function updateAccountSuccess(record) {
  return {
    type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
    record,
  }
}

function updateAccountFailure(error, accountId) {
  return {
    type: actionTypes.UPDATE_ACCOUNT_FAILURE,
    error,
    accountId,
  }
}

export function updateAccount(accountId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingAccount(accountId))
    authRequest
      .putEntity(`${AUTHSERVICE_BASE_URL}${ACCOUNTS_API_PATH}/${accountId}`, params)
      .then(res => dispatch(updateAccountSuccess(res.data)))
      .catch(error => dispatch(updateAccountFailure(error, accountId)))
  }
}