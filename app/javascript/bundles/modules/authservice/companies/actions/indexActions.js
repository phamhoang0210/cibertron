import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {COMPANIES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingCompany(companyId) {
  return {
    type: actionTypes.SET_IS_DELETING_COMPANY,
    companyId,
  }
}

function deleteCompanySuccess(record) {
  return {
    type: actionTypes.DELETE_COMPANY_SUCCESS,
    record,
  }
}

function deleteCompanyFailure(error, companyId) {
  return {
    type: actionTypes.DELETE_COMPANY_FAILURE,
    error,
    companyId,
  }
}

export function deleteCompany(companyId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCompany(companyId))
    authRequest
      .deleteEntity(`${AUTHSERVICE_BASE_URL}${COMPANIES_API_PATH}/${companyId}`)
      .then(res => {
        dispatch(deleteCompanySuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('companyFilters'))
        dispatch(fetchCompanies(filterParams))
      })
      .catch(error => dispatch(deleteCompanyFailure(error, companyId)))
  }
}