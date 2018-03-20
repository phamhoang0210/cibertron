import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {ROLES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingRole() {
  return {
    type: actionTypes.SET_IS_CREATING_ROLE,
  }
}

function createRoleSuccess(record) {
  return {
    type: actionTypes.CREATE_ROLE_SUCCESS,
    record
  }
}

function createRoleFailure(error) {
  return {
    type: actionTypes.CREATE_ROLE_FAILURE,
    error,
  }
}

export function createRole(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingRole())

    return authRequest
      .submitEntity(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}`, params)
      .then(res => dispatch(createRoleSuccess(res.data)))
      .catch(error => dispatch(createRoleFailure(error)))
  }
}