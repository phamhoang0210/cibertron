import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {USERSERVICE_BASE_URL, USERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingUser() {
  return {
    type: actionTypes.SET_IS_FETCHING_USER,
  }
}

function fetchUserSuccess(record) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    record,
  }
}

function fetchUserFailure(error) {
  return {
    type: actionTypes.FETCH_USER_FAILURE,
    error,
  }
}

export function fetchUser(userId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingUser())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}/${userId}`, params)
      .then(res => dispatch(fetchUserSuccess(res.data)))
      .catch(error => dispatch(fetchUserFailure(error)))
  }
}

function setIsUpdatingUser(userId) {
  return {
    type: actionTypes.SET_IS_UPDATING_USER,
    userId,
  }
}

function updateUserSuccess(record) {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    record,
  }
}

function updateUserFailure(error, userId) {
  return {
    type: actionTypes.UPDATE_USER_FAILURE,
    error,
    userId,
  }
}

export function updateUser(userId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingUser(userId))
    authRequest
      .putEntity(`${USERSERVICE_BASE_URL}${USERS_API_PATH}/${userId}`, params)
      .then(res => dispatch(updateUserSuccess(res.data)))
      .catch(error => dispatch(updateUserFailure(error, userId)))
  }
}