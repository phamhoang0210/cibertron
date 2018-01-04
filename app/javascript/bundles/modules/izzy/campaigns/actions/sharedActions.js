import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AIRI_BASE_URL, MEEPO_BASE_URL, MORPHLING_BASE_URL, 
  LISTS_API_PATH, SENDERS_API_PATH, TEMPLATES_API_PATH, USERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

// Fetch lists
function setIsFetchingLists() {
  return {
    type: actionTypes.SET_IS_FETCHING_LISTS,
  }
}

function fetchListsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LISTS_SUCCESS,
    records,
    filters,
  }
}

function fetchListsFailure(error) {
  return {
    type: actionTypes.FETCH_LISTS_FAILURE,
    error,
  }
}

export function fetchLists(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLists())
    authRequest
      .fetchEntities(`${AIRI_BASE_URL}${LISTS_API_PATH}`, params)
      .then(res => dispatch(fetchListsSuccess(res.data)))
      .catch(error => dispatch(fetchListsFailure(error)))
  }
}

// Fetch senders
function setIsFetchingSenders() {
  return {
    type: actionTypes.SET_IS_FETCHING_SENDERS,
  }
}

function fetchSendersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SENDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchSendersFailure(error) {
  return {
    type: actionTypes.FETCH_SENDERS_FAILURE,
    error,
  }
}

export function fetchSenders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSenders())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${SENDERS_API_PATH}`, params)
      .then(res => dispatch(fetchSendersSuccess(res.data)))
      .catch(error => dispatch(fetchSendersFailure(error)))
  }
}

// Fetch templates
function setIsFetchingTemplates() {
  return {
    type: actionTypes.SET_IS_FETCHING_TEMPLATES,
  }
}

function fetchTemplatesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    records,
    filters,
  }
}

function fetchTemplatesFailure(error) {
  return {
    type: actionTypes.FETCH_TEMPLATES_FAILURE,
    error,
  }
}

export function fetchTemplates(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingTemplates())
    authRequest
      .fetchEntities(`${MORPHLING_BASE_URL}${TEMPLATES_API_PATH}`, params)
      .then(res => dispatch(fetchTemplatesSuccess(res.data)))
      .catch(error => dispatch(fetchTemplatesFailure(error)))
  }
}

