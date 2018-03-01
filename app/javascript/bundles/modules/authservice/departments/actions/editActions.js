import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DEPARTMENTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingDepartment() {
  return {
    type: actionTypes.SET_IS_FETCHING_DEPARTMENT,
  }
}

function fetchDepartmentSuccess(record) {
  return {
    type: actionTypes.FETCH_DEPARTMENT_SUCCESS,
    record,
  }
}

function fetchDepartmentFailure(error) {
  return {
    type: actionTypes.FETCH_DEPARTMENT_FAILURE,
    error,
  }
}

export function fetchDepartment(departmentId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDepartment())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}/${departmentId}`, params)
      .then(res => dispatch(fetchDepartmentSuccess(res.data)))
      .catch(error => dispatch(fetchDepartmentFailure(error)))
  }
}

function setIsUpdatingDepartment(departmentId) {
  return {
    type: actionTypes.SET_IS_UPDATING_DEPARTMENT,
    departmentId,
  }
}

function updateDepartmentSuccess(record) {
  return {
    type: actionTypes.UPDATE_DEPARTMENT_SUCCESS,
    record,
  }
}

function updateDepartmentFailure(error, departmentId) {
  return {
    type: actionTypes.UPDATE_DEPARTMENT_FAILURE,
    error,
    departmentId,
  }
}

export function updateDepartment(departmentId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingDepartment(departmentId))
    authRequest
      .putEntity(`${AUTHSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}/${departmentId}`, params)
      .then(res => dispatch(updateDepartmentSuccess(res.data)))
      .catch(error => dispatch(updateDepartmentFailure(error, departmentId)))
  }
}