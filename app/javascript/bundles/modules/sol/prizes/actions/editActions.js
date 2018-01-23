import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {SOL_BASE_URL, PRIZES_API_PATH, PRIZE_CODES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingPrize() {
  return {
    type: actionTypes.SET_IS_FETCHING_PRIZE,
  }
}

function fetchPrizeSuccess(record) {
  return {
    type: actionTypes.FETCH_PRIZE_SUCCESS,
    record,
  }
}

function fetchPrizeFailure(error) {
  return {
    type: actionTypes.FETCH_PRIZE_FAILURE,
    error,
  }
}

export function fetchPrize(prizeId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPrize())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${PRIZES_API_PATH}/${prizeId}`, params)
      .then(res => dispatch(fetchPrizeSuccess(res.data)))
      .catch(error => dispatch(fetchPrizeFailure(error)))
  }
}

function setIsUpdatingPrize(prizeId) {
  return {
    type: actionTypes.SET_IS_UPDATING_PRIZE,
    prizeId,
  }
}

function updatePrizeSuccess(record) {
  return {
    type: actionTypes.UPDATE_PRIZE_SUCCESS,
    record,
  }
}

function updatePrizeFailure(error, prizeId) {
  return {
    type: actionTypes.UPDATE_PRIZE_FAILURE,
    error,
    prizeId,
  }
}

export function updatePrize(prizeId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingPrize(prizeId))
    authRequest
      .putEntity(`${SOL_BASE_URL}${PRIZES_API_PATH}/${prizeId}`, params)
      .then(res => dispatch(updatePrizeSuccess(res.data)))
      .catch(error => dispatch(updatePrizeFailure(error, prizeId)))
  }
}

// Fetch prize code
function setIsFetchingPrizeCodes() {
  return {
    type: actionTypes.SET_IS_FETCHING_PRIZE_CODES,
  }
}

function fetchPrizeCodesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PRIZE_CODES_SUCCESS,
    records,
    filters,
  }
}

function fetchPrizeCodesFailure(error) {
  return {
    type: actionTypes.FETCH_PRIZE_CODES_FAILURE,
    error,
  }
}

export function fetchPrizeCodes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPrizeCodes())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${PRIZE_CODES_API_PATH}`, params)
      .then(res => dispatch(fetchPrizeCodesSuccess(res.data)))
      .catch(error => dispatch(fetchPrizeCodesFailure(error)))
  }
}