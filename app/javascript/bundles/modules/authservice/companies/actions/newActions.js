import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL, COMPANIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCompany() {
  return {
    type: actionTypes.SET_IS_CREATING_COMPANY,
  }
}

function createCompanySuccess(record) {
  return {
    type: actionTypes.CREATE_COMPANY_SUCCESS,
    record
  }
}

function createCompanyFailure(error) {
  return {
    type: actionTypes.CREATE_COMPANY_FAILURE,
    error,
  }
}

export function createCompany(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCompany())

    return authRequest
      .submitEntity(`${AUTHSERVICE_BASE_URL}${COMPANIES_API_PATH}`, params)
      .then(res => dispatch(createCompanySuccess(res.data)))
      .catch(error => dispatch(createCompanyFailure(error)))
  }
}