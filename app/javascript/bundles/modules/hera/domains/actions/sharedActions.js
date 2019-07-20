import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import { getFilterParams } from 'helpers/applicationHelper'
import { 
  AUTHS_API_PATH, 
  PLATFORM_API_PATH,
  STATUS_DOMAIN_COUNT_PATH,
} from '../constants/paths'

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
  let keyword=""
  if (params['keyword']) {
    keyword = params['keyword']
  }
  return dispatch => {
    dispatch(setIsFetchingAllUsers())
    authRequest
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTHS_API_PATH}`, {'full_search': keyword})
      .then(res => dispatch(fetchAllUsersSuccess(res.data)))
      .catch(error => dispatch(fetchAllUsersFailure(error)))
  }
}

//Fetch platform
function setIsFetchingPlatForms() {
  return {
    type: actionTypes.SET_IS_FETCHING_PLATFORMS,
  }
}

function fetchPlatformsSuccess(records) {
  return {
    type: actionTypes.FETCH_ALL_PLATFORMS_SUCCESS,
    records: records.data,
  }
}

function fetchPlatformsFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_PLATFORMS_FAILURE,
    error,
  }
}

export function fetchPlatforms(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPlatForms())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${PLATFORM_API_PATH}`, params)
      .then(res => dispatch(fetchPlatformsSuccess(res.data)))
      .catch(error => dispatch(fetchPlatformsFailure(error)))
  }
}

// status domain count
function setIsFetchStatusDomainCount() {
  return {
    type: actionTypes.SET_IS_FETCHING_STATUS_DOMAIN_COUNT,
  }
}

function fetchStatusDomainCountSuccess(record) {
  return {
    type: actionTypes.FETCH_STATUS_DOMAIN_COUNT_SUCCESS,
    record: record.data,
  }
}

function fetchPlatformsFailure(error) {
  return {
    type: actionTypes.FETCH_STATUS_DOMAIN_COUNT_FAILURE,
    error,
  }
}

export function fetchStatusDomainCount(params = {}) {
  return dispatch => {
    dispatch(setIsFetchStatusDomainCount())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${STATUS_DOMAIN_COUNT_PATH}`, params)
      .then(res => dispatch(fetchStatusDomainCountSuccess(res.data)))
      .catch(error => dispatch(fetchPlatformsFailure(error)))
  }
}
