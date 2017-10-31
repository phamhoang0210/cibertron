import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL, COMPANIES_API_PATH, DEPARTMENTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingCompanies() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMPANIES,
  }
}

function fetchCompaniesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COMPANIES_SUCCESS,
    records,
    filters,
  }
}

function fetchCompaniesFailure(error) {
  return {
    type: actionTypes.FETCH_COMPANIES_FAILURE,
    error,
  }
}

export function fetchCompanies(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCompanies())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${COMPANIES_API_PATH}`, params)
      .then(res => dispatch(fetchCompaniesSuccess(res.data)))
      .catch(error => dispatch(fetchCompaniesFailure(error)))
  }
}

function setIsFetchingSupDepartments() {
  return {
    type: actionTypes.SET_IS_FETCHING_SUP_DEPARTMENTS,
  }
}

function fetchSupDepartmentsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SUP_DEPARTMENTS_SUCCESS,
    records,
    filters,
  }
}

function fetchSupDepartmentsFailure(error) {
  return {
    type: actionTypes.FETCH_SUP_DEPARTMENTS_FAILURE,
    error,
  }
}

export function fetchSupDepartments(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSupDepartments())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}`, params)
      .then(res => dispatch(fetchSupDepartmentsSuccess(res.data)))
      .catch(error => dispatch(fetchSupDepartmentsFailure(error)))
  }
}