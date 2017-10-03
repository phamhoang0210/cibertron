import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDINGPAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingpage() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDINGPAGE,
  }
}

function fetchLandingpageSuccess(record) {
  return {
    type: actionTypes.FETCH_LANDINGPAGE_SUCCESS,
    record,
  }
}

function fetchLandingpageFailure(error) {
  return {
    type: actionTypes.FETCH_LANDINGPAGE_FAILURE,
    error,
  }
}

export function fetchLandingpage(landingpageId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingpage())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDINGPAGES_API_PATH}/${landingpageId}`, params)
      .then(res => dispatch(fetchLandingpageSuccess(res.data)))
      .catch(error => dispatch(fetchLandingpageFailure(error)))
  }
}

function setIsUpdatingLandingpage(landingpageId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LANDINGPAGE,
    landingpageId,
  }
}

function updateLandingpageSuccess(record) {
  return {
    type: actionTypes.UPDATE_LANDINGPAGE_SUCCESS,
    record,
  }
}

function updateLandingpageFailure(error, landingpageId) {
  return {
    type: actionTypes.UPDATE_LANDINGPAGE_FAILURE,
    error,
    landingpageId,
  }
}

export function updateLandingpage(landingpageId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingLandingpage(landingpageId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${LANDINGPAGES_API_PATH}/${landingpageId}`, params)
      .then(res => dispatch(updateLandingpageSuccess(res.data)))
      .catch(error => dispatch(updateLandingpageFailure(error, landingpageId)))
  }
}