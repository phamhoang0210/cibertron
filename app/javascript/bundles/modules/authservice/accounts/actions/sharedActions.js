import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AUTHSERVICE_BASE_URL, DEPARTMENTS_API_PATH, ROLES_API_PATH,
  ADMINROLES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingDepartments() {
  return {
    type: actionTypes.SET_IS_FETCHING_DEPARTMENTS,
  }
}

function fetchDepartmentsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_DEPARTMENTS_SUCCESS,
    records,
    filters,
  }
}

function fetchDepartmentsFailure(error) {
  return {
    type: actionTypes.FETCH_DEPARTMENTS_FAILURE,
    error,
  }
}

export function fetchDepartments(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDepartments())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}`, params)
      .then(res => dispatch(fetchDepartmentsSuccess(res.data)))
      .catch(error => dispatch(fetchDepartmentsFailure(error)))
  }
}


function setIsFetchingRoles() {
  return {
    type: actionTypes.SET_IS_FETCHING_ROLES,
  }
}

function fetchRolesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ROLES_SUCCESS,
    records,
    filters,
  }
}

function fetchRolesFailure(error) {
  return {
    type: actionTypes.FETCH_ROLES_FAILURE,
    error,
  }
}

export function fetchRoles(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingRoles())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}`, params)
      .then(res => dispatch(fetchRolesSuccess(res.data)))
      .catch(error => dispatch(fetchRolesFailure(error)))
  }
}

function setIsFetchingAdminroles() {
  return {
    type: actionTypes.SET_IS_FETCHING_ADMINROLES,
  }
}

function fetchAdminrolesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ADMINROLES_SUCCESS,
    records,
    filters,
  }
}

function fetchAdminrolesFailure(error) {
  return {
    type: actionTypes.FETCH_ADMINROLES_FAILURE,
    error,
  }
}

export function fetchAdminroles(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAdminroles())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ADMINROLES_API_PATH}`, params)
      .then(res => dispatch(fetchAdminrolesSuccess(res.data)))
      .catch(error => dispatch(fetchAdminrolesFailure(error)))
  }
} 