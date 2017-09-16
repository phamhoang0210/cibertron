import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CRONUS_BASE_URL, CHANNELS_API_PATH, CATEGORIES_API_PATH, USERS_API_PATH, 
  DEPARTMENTS_API_PATH, USERSERVICE_BASE_URL,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingChannels() {
  return {
    type: actionTypes.SET_IS_FETCHING_CHANNELS,
  }
}

function fetchChannelsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CHANNELS_SUCCESS,
    records,
    filters,
  }
}

function fetchChannelsFailure(error) {
  return {
    type: actionTypes.FETCH_CHANNELS_FAILURE,
    error,
  }
}

export function fetchChannels(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingChannels())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}`, params)
      .then(res => dispatch(fetchChannelsSuccess(res.data)))
      .catch(error => dispatch(fetchChannelsFailure(error)))
  }
}


function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, params)
      .then(res => dispatch(fetchUsersSuccess(res.data)))
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}

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
