import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {USERSERVICE_BASE_URL, DEPARTMENTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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
      .fetchEntities(`${USERSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}`, params)
      .then(res => dispatch(fetchDepartmentsSuccess(res.data)))
      .catch(error => dispatch(fetchDepartmentsFailure(error)))
  }
}

function setIsDeletingDepartment(departmentId) {
  return {
    type: actionTypes.SET_IS_DELETING_DEPARTMENT,
    departmentId,
  }
}

function deleteDepartmentSuccess(record) {
  return {
    type: actionTypes.DELETE_DEPARTMENT_SUCCESS,
    record,
  }
}

function deleteDepartmentFailure(error, departmentId) {
  return {
    type: actionTypes.DELETE_DEPARTMENT_FAILURE,
    error,
  }
}

export function deleteDepartment(departmentId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingDepartment(departmentId))
    authRequest
      .deleteEntity(`${USERSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}/${departmentId}`)
      .then(res => {
        dispatch(deleteDepartmentSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('departmentFilters'))
        dispatch(fetchDepartments(filterParams))
      })
      .catch(error => dispatch(deleteDepartmentFailure(error, departmentId)))
  }
}