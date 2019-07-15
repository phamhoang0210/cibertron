import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  LANDING_PAGES_API_PATH, 
  LINK_EDITOR_PATH
} from '../constants/paths'
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

//fetch editor link
function setIsFetchingEditorLink() {
  return {
    type: actionTypes.SET_IS_FETCHING_EDITOR_LINK,
  }
}

function fetchEditorLinkSuccess(record) {
  return {
    type: actionTypes.FETCH_EDITOR_LINK_SUCCESS,
    record,
  }
}

function fetchEditorLinkFailure(error) {
  return {
    type: actionTypes.FETCH_EDITOR_LINK_FAILURE,
    error,
  }
}

export function fetchEditorLink(landingPageId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingEditorLink())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LINK_EDITOR_PATH}/${landingPageId}`, params)
      .then(res => dispatch(fetchEditorLinkSuccess(res.data)))
      .catch(error => dispatch(fetchEditorLinkFailure(error)))
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

//delete edit link
export function deleteCourse(index) {
  return {
    type: actionTypes.DELETE_COURSE,
    index,
  }
}