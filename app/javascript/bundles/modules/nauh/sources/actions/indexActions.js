import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  A3_STORAGE_BASE_URL, SOURCES_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSources() {
  return {
    type: actionTypes.SET_IS_FETCHING_SOURCES,
  }
}

function fetchSourcesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SOURCES_SUCCESS,
    records,
    filters,
  }
}

function fetchSourcesFailure(error) {
  return {
    type: actionTypes.FETCH_SOURCES_FAILURE,
    error,
  }
}

export function fetchSources(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSources())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}`, params)
      .then(res => dispatch(fetchSourcesSuccess(res.data)))
      .catch(error => dispatch(fetchSourcesFailure(error)))
  }
}

function setIsHandingOver() {
  return {
    type: actionTypes.SET_IS_HANDING_OVER,
  }
}

function handOverSuccess(response) {
  return {
    type: actionTypes.HAND_OVER_SUCCESS,
  }
}

function handOverFailure(error) {
  return {
    type: actionTypes.HAND_OVER_FAILURE,
  }
}

export function handOver(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsHandingOver())
    authRequest
      .fetchEntities(`${A3_STORAGE_BASE_URL}${SOURCES_API_PATH}/hand_over`)
      .then(res => {
        dispatch(handOverSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('sourceFilters'))
        dispatch(fetchSources(filterParams))
      })
      .catch(error => dispatch(handOverFailure(error)))
  }
}