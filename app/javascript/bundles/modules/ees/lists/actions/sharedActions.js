import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  UNSUBSCRIBES_API_PATH, BOUNCES_API_PATH, USERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

//Fetch unsubscribes
function setIsFetchingUnsubscribes() {
  return {
    type: actionTypes.SET_IS_FETCHING_UNSUBSCRIBES,
  }
}

function fetchUnsubscribesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_UNSUBSCRIBES_SUCCESS,
    records,
    filters,
  }
}

function fetchUnsubscribesFailure(error) {
  return {
    type: actionTypes.FETCH_UNSUBSCRIBES_FAILURE,
    error,
  }
}

export function fetchUnsubscribes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingUnsubscribes())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${UNSUBSCRIBES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchUnsubscribesSuccess(res.data))
      })
      .catch(error => dispatch(fetchUnsubscribesFailure(error)))
  }
}
// Fetch users
function setIsFetchingAllUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_ALL_USERS,
  }
}

function fetchAllUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchAllUsersFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILURE,
    error,
  }
}

export function fetchAllUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAllUsers())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, params)
      .then(res => dispatch(fetchAllUsersSuccess(res.data)))
      .catch(error => dispatch(fetchAllUsersFailure(error)))
  }
}
// Fetch bounces
function setIsFetchingBounces() {
  return {
    type: actionTypes.SET_IS_FETCHING_BOUNCES,
  }
}

function fetchBouncesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_BOUNCES_SUCCESS,
    records,
    filters,
  }
}

function fetchBouncesFailure(error) {
  return {
    type: actionTypes.FETCH_BOUNCES_FAILURE,
    error,
  }
}

export function fetchBounces(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingBounces())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${BOUNCES_API_PATH}`, params)
      .then(res => {
        dispatch(fetchBouncesSuccess(res.data))
      })
      .catch(error => dispatch(fetchBouncesFailure(error)))
  }
}

function setIsImportUnsubscribes() {
  return {
    type: actionTypes.SET_IS_IMPORTING_UNSUBSCRIBES,
  }
}

function importUnsubscribesSucces(importResult) {
  return {
    type: actionTypes.IMPORT_UNSUBSCRIBES_SUCCESS,
    importResult,
  }
}

function importUnsubscribesFailure(error) {
  return {
    type: actionTypes.IMPORT_UNSUBSCRIBES_FAILURE,
    error,
  }
}

export function importUnsubscribes(params = {}) {
  return dispatch => {
    dispatch(setIsImportUnsubscribes())

    return authRequest
      .uploadEntity(`${AIRI_BASE_URL}${UNSUBSCRIBES_API_PATH}/import_unsubscribes`, params)
      .then(res => {
        dispatch(importUnsubscribesSucces(res.data))
        dispatch(fetchUnsubscribes())
      })
      .catch(error => dispatch(importUnsubscribesFailure(error)))
  }
}

function setIsImportBounces() {
  return {
    type: actionTypes.SET_IS_IMPORTING_BOUNCES,
  }
}

function importBouncesSucces(importResult) {
  return {
    type: actionTypes.IMPORT_BOUNCES_SUCCESS,
    importResult,
  }
}

function importBouncesFailure(error) {
  return {
    type: actionTypes.IMPORT_BOUNCES_FAILURE,
    error,
  }
}

export function importBounces(params = {}) {
  return dispatch => {
    dispatch(setIsImportBounces())

    return authRequest
      .uploadEntity(`${AIRI_BASE_URL}${BOUNCES_API_PATH}/import`, params)
      .then(res => {
        dispatch(importBouncesSucces(res.data))
        dispatch(fetchBounces())
      })
      .catch(error => dispatch(importBouncesFailure(error)))
  }
}