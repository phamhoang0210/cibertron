import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {COMPANIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCompany() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMPANY,
  }
}

function fetchCompanySuccess(record) {
  return {
    type: actionTypes.FETCH_COMPANY_SUCCESS,
    record,
  }
}

function fetchCompanyFailure(error) {
  return {
    type: actionTypes.FETCH_COMPANY_FAILURE,
    error,
  }
}

export function fetchCompany(companyId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCompany())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${COMPANIES_API_PATH}/${companyId}`, params)
      .then(res => dispatch(fetchCompanySuccess(res.data)))
      .catch(error => dispatch(fetchCompanyFailure(error)))
  }
}

function setIsUpdatingCompany(companyId) {
  return {
    type: actionTypes.SET_IS_UPDATING_COMPANY,
    companyId,
  }
}

function updateCompanySuccess(record) {
  return {
    type: actionTypes.UPDATE_COMPANY_SUCCESS,
    record,
  }
}

function updateCompanyFailure(error, companyId) {
  return {
    type: actionTypes.UPDATE_COMPANY_FAILURE,
    error,
    companyId,
  }
}

export function updateCompany(companyId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCompany(companyId))
    authRequest
      .putEntity(`${AUTHSERVICE_BASE_URL}${COMPANIES_API_PATH}/${companyId}`, params)
      .then(res => dispatch(updateCompanySuccess(res.data)))
      .catch(error => dispatch(updateCompanyFailure(error, companyId)))
  }
}