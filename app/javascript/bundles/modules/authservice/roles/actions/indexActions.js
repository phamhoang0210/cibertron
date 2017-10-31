import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {AUTHSERVICE_BASE_URL, ROLES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingRole(roleId) {
  return {
    type: actionTypes.SET_IS_DELETING_ROLE,
    roleId,
  }
}

function deleteRoleSuccess(record) {
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    record,
  }
}

function deleteRoleFailure(error, roleId) {
  return {
    type: actionTypes.DELETE_ROLE_FAILURE,
    error,
  }
}

export function deleteRole(roleId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingRole(roleId))
    authRequest
      .deleteEntity(`${AUTHSERVICE_BASE_URL}${ROLES_API_PATH}/${roleId}`)
      .then(res => {
        dispatch(deleteRoleSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('roleFilters'))
        dispatch(fetchRoles(filterParams))
      })
      .catch(error => dispatch(deleteRoleFailure(error, roleId)))
  }
}