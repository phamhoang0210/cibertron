import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AUTHSERVICE_BASE_URL, COMPANIES_API_PATH, ROLES_API_PATH, ENTITIES_API_PATH
} from '../constants/paths'
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

function setIsFetchingSupRoles() {
  return {
    type: actionTypes.SET_IS_FETCHING_SUP_ROLES,
  }
}

function fetchSupRolesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SUP_ROLES_SUCCESS,
    records,
    filters,
  }
}

function fetchSupRolesFailure(error) {
  return {
    type: actionTypes.FETCH_SUP_ROLES_FAILURE,
    error,
  }
}

export function fetchSupRoles(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSupRoles())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}`, params)
      .then(res => dispatch(fetchSupRolesSuccess(res.data)))
      .catch(error => dispatch(fetchSupRolesFailure(error)))
  }
}

function setIsFetchingEntities() {
  return {
    type: actionTypes.SET_IS_FETCHING_ENTITIES,
  }
}

function fetchEntitiesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ENTITIES_SUCCESS,
    records,
    filters,
  }
}

function fetchEntitiesFailure(error) {
  return {
    type: actionTypes.FETCH_ENTITIES_FAILURE,
    error,
  }
}

export function fetchEntities(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingEntities())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ENTITIES_API_PATH}`, params)
      .then(res => dispatch(fetchEntitiesSuccess(res.data)))
      .catch(error => dispatch(fetchEntitiesFailure(error)))
  }
}