import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDING_PAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingPage() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGE,
  }
}

function fetchLandingPageSuccess(record) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_SUCCESS,
    record,
  }
}

function fetchLandingPageFailure(error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_FAILURE,
    error,
  }
}

export function fetchLandingPage(landingPageId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPage())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}`, params)
      .then(res => dispatch(fetchLandingPageSuccess(res.data)))
      .catch(error => dispatch(fetchLandingPageFailure(error)))
  }
}

function setIsUpdatingLandingPage(landingPageId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LANDING_PAGE,
    landingPageId,
  }
}

function updateLandingPageSuccess(record) {
  return {
    type: actionTypes.UPDATE_LANDING_PAGE_SUCCESS,
    record,
  }
}

function updateLandingPageFailure(error, landingPageId) {
  return {
    type: actionTypes.UPDATE_LANDING_PAGE_FAILURE,
    error,
    landingPageId,
  }
}

export function updateLandingPage(landingPageId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingLandingPage(landingPageId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}`, params)
      .then(res => dispatch(updateLandingPageSuccess(res.data)))
      .catch(error => dispatch(updateLandingPageFailure(error, landingPageId)))
  }
}