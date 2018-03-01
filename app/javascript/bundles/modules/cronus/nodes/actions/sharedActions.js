import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CHANNELS_API_PATH, CATEGORIES_API_PATH, USERS_API_PATH,
  DEPARTMENTS_API_PATH, TARGETS_API_PATH,
  COURSES_API_PATH, COMBOS_API_PATH
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

function setIsFetchingCourses() {
  return {
    type: actionTypes.SET_IS_FETCHING_COURSES,
  }
}

function fetchCoursesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COURSES_SUCCESS,
    records,
    filters,
  }
}

function fetchCoursesFailure(error) {
  return {
    type: actionTypes.FETCH_COURSES_FAILURE,
    error,
  }
}

export function fetchCourses(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCourses())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COURSES_API_PATH}`, params)
      .then(res => dispatch(fetchCoursesSuccess(res.data)))
      .catch(error => dispatch(fetchCoursesFailure(error)))
  }
}

function setIsFetchingCombos() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMBOS,
  }
}

function fetchCombosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COMBOS_SUCCESS,
    records,
    filters,
  }
}

function fetchCombosFailure(error) {
  return {
    type: actionTypes.FETCH_COMBOS_FAILURE,
    error,
  }
}

export function fetchCombos(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCombos())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COMBOS_API_PATH}`, params)
      .then(res => dispatch(fetchCombosSuccess(res.data)))
      .catch(error => dispatch(fetchCombosFailure(error)))
  }
}

function setIsFetchingTargets() {
  return {
    type: actionTypes.SET_IS_FETCHING_TARGETS,
  }
}

function fetchTargetsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TARGETS_SUCCESS,
    records,
    filters,
  }
}

function fetchTargetsFailure(error) {
  return {
    type: actionTypes.FETCH_TARGETS_FAILURE,
    error,
  }
}

export function fetchTargets(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTargets())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${TARGETS_API_PATH}`, params)
      .then(res => dispatch(fetchTargetsSuccess(res.data)))
      .catch(error => dispatch(fetchTargetsFailure(error)))
  }
}