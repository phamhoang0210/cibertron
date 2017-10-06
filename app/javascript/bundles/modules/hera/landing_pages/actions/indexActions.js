import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDING_PAGES_API_PATH, LANDING_PAGE_LOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingPages() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGES,
  }
}

function fetchLandingPagesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGES_SUCCESS,
    records,
    filters,
  }
}

function fetchLandingPagesFailure(error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGES_FAILURE,
    error,
  }
}

export function fetchLandingPages(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPages())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}`, params)
      .then(res => dispatch(fetchLandingPagesSuccess(res.data)))
      .catch(error => dispatch(fetchLandingPagesFailure(error)))
  }
}

function setIsFetchingLandingPageLogs(landingPage) {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGE_LOGS,
    landingPage,
  }
}

function fetchLandingPageLogsSuccess(landingPage, {records, filters}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_LOGS_SUCCESS,
    records,
    filters,
    landingPage,
  }
}

function fetchLandingPageLogsFailure(landingPage, error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_LOGS_FAILURE,
    error,
    landingPage,
  }
}

export function fetchLandingPageLogs(landingPage, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPageLogs(landingPage))
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGE_LOGS_API_PATH}`, params)
      .then(res => dispatch(fetchLandingPageLogsSuccess(landingPage, res.data)))
      .catch(error => dispatch(fetchLandingPageLogsFailure(landingPage, error)))
  }
}

function setIsDeletingLandingPage(landingPageId) {
  return {
    type: actionTypes.SET_IS_DELETING_LANDING_PAGE,
    landingPageId,
  }
}

function deleteLandingPageSuccess(record) {
  return {
    type: actionTypes.DELETE_LANDING_PAGE_SUCCESS,
    record,
  }
}

function deleteLandingPageFailure(error, landingPageId) {
  return {
    type: actionTypes.DELETE_LANDING_PAGE_FAILURE,
    error,
    landingPageId,
  }
}

export function deleteLandingPage(landingPageId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingLandingPage(landingPageId))
    authRequest
      .deleteEntity(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}`)
      .then(res => {
        dispatch(deleteLandingPageSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('landingPageFilters'))
        dispatch(fetchLandingPages(filterParams))
      })
      .catch(error => dispatch(deleteLandingPageFailure(error, landingPageId)))
  }
}