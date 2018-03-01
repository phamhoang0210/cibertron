import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import { ACCOUNTS_API_PATH } from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingAccount() {
  return {
    type: actionTypes.SET_IS_CREATING_ACCOUNT,
  }
}

function createAccountSuccess(record) {
  return {
    type: actionTypes.CREATE_ACCOUNT_SUCCESS,
    record
  }
}

function createAccountFailure(error) {
  return {
    type: actionTypes.CREATE_ACCOUNT_FAILURE,
    error,
  }
}

export function createAccount(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingAccount())

    return authRequest
      .submitEntity(`${AUTHSERVICE_BASE_URL}${ACCOUNTS_API_PATH}`, params)
      .then(res => dispatch(createAccountSuccess(res.data)))
      .catch(error => dispatch(createAccountFailure(error)))
  }
}