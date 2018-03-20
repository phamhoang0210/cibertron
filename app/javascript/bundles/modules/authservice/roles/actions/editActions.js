import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {ROLES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingRole() {
  return {
    type: actionTypes.SET_IS_FETCHING_ROLE,
  }
}

function fetchRoleSuccess(record) {
  return {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    record,
  }
}

function fetchRoleFailure(error) {
  return {
    type: actionTypes.FETCH_ROLE_FAILURE,
    error,
  }
}

export function fetchRole(roleId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingRole())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}/${roleId}`, params)
      .then(res => dispatch(fetchRoleSuccess(res.data)))
      .catch(error => dispatch(fetchRoleFailure(error)))
  }
}

function setIsUpdatingRole(roleId) {
  return {
    type: actionTypes.SET_IS_UPDATING_ROLE,
    roleId,
  }
}

function updateRoleSuccess(record) {
  return {
    type: actionTypes.UPDATE_ROLE_SUCCESS,
    record,
  }
}

function updateRoleFailure(error, roleId) {
  return {
    type: actionTypes.UPDATE_ROLE_FAILURE,
    error,
    roleId,
  }
}

export function updateRole(roleId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingRole(roleId))
    authRequest
      .putEntity(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}/${roleId}`, params)
      .then(res => dispatch(updateRoleSuccess(res.data)))
      .catch(error => dispatch(updateRoleFailure(error, roleId)))
  }
}