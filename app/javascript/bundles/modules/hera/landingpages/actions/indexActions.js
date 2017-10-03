import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDINGPAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingpages() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDINGPAGES,
  }
}

function fetchLandingpagesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LANDINGPAGES_SUCCESS,
    records,
    filters,
  }
}

function fetchLandingpagesFailure(error) {
  return {
    type: actionTypes.FETCH_LANDINGPAGES_FAILURE,
    error,
  }
}

export function fetchLandingpages(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingpages())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDINGPAGES_API_PATH}`, params)
      .then(res => dispatch(fetchLandingpagesSuccess(res.data)))
      .catch(error => dispatch(fetchLandingpagesFailure(error)))
  }
}

function setIsDeletingLandingpage(landingpageId) {
  return {
    type: actionTypes.SET_IS_DELETING_LANDINGPAGE,
    landingpageId,
  }
}

function deleteLandingpageSuccess(record) {
  return {
    type: actionTypes.DELETE_LANDINGPAGE_SUCCESS,
    record,
  }
}

function deleteLandingpageFailure(error, landingpageId) {
  return {
    type: actionTypes.DELETE_LANDINGPAGE_FAILURE,
    error,
    landingpageId,
  }
}

export function deleteLandingpage(landingpageId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingLandingpage(landingpageId))
    authRequest
      .deleteEntity(`${HERA_BASE_URL}${LANDINGPAGES_API_PATH}/${landingpageId}`)
      .then(res => {
        dispatch(deleteLandingpageSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('landingpageFilters'))
        dispatch(fetchLandingpages(filterParams))
      })
      .catch(error => dispatch(deleteLandingpageFailure(error, landingpageId)))
  }
}