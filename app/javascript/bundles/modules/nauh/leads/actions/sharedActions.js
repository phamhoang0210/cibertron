import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  NAUH_BASE_URL, LEAD_LEVELS_API_PATH, CATEGORIES_API_PATH,
  USERSERVICE_BASE_URL, USERS_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingLeadLevels() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_LEVELS,
  }
}

function fetchLeadLevelsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_LEVELS_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadLevelsFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_LEVELS_FAILURE,
    error,
  }
}

export function fetchLeadLevels(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadLevels())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_LEVELS_API_PATH}`, params)
      .then(res => dispatch(fetchLeadLevelsSuccess(res.data)))
      .catch(error => dispatch(fetchLeadLevelsFailure(error)))
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