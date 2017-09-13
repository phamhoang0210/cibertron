import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {USERSERVICE_BASE_URL, DEPARTMENTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingDepartment() {
  return {
    type: actionTypes.SET_IS_CREATING_DEPARTMENT,
  }
}

function createDepartmentSuccess(record) {
  return {
    type: actionTypes.CREATE_DEPARTMENT_SUCCESS,
    record
  }
}

function createDepartmentFailure(error) {
  return {
    type: actionTypes.CREATE_DEPARTMENT_FAILURE,
    error,
  }
}

export function createDepartment(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingDepartment())

    return authRequest
      .submitEntity(`${USERSERVICE_BASE_URL}${DEPARTMENTS_API_PATH}`, params)
      .then(res => dispatch(createDepartmentSuccess(res.data)))
      .catch(error => dispatch(createDepartmentFailure(error)))
  }
}