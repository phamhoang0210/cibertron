import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL, ACCOUNTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingAccounts() {
  return {
    type: actionTypes.SET_IS_FETCHING_ACCOUNTS,
  }
}

function fetchAccountsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ACCOUNTS_SUCCESS,
    records,
    filters,
  }
}

function fetchAccountsFailure(error) {
  return {
    type: actionTypes.FETCH_ACCOUNTS_FAILURE,
    error,
  }
}

export function fetchAccounts(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAccounts())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ACCOUNTS_API_PATH}`, params)
      .then(res => dispatch(fetchAccountsSuccess(res.data)))
      .catch(error => dispatch(fetchAccountsFailure(error)))
  }
}

function setIsDeletingAccount(accountId) {
  return {
    type: actionTypes.SET_IS_DELETING_ACCOUNT,
    accountId,
  }
}

function deleteAccountSuccess(record) {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
    record,
  }
}

function deleteAccountFailure(error, accountId) {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAILURE,
    error,
  }
}

export function deleteAccount(accountId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingAccount(accountId))
    authRequest
      .deleteEntity(`${AUTHSERVICE_BASE_URL}${ACCOUNTS_API_PATH}/${accountId}`)
      .then(res => {
        dispatch(deleteAccountSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('accountFilters'))
        dispatch(fetchAccounts(filterParams))
      })
      .catch(error => dispatch(deleteAccountFailure(error, accountId)))
  }
}