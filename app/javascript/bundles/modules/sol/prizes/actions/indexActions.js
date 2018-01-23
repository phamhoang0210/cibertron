import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  SOL_BASE_URL, PRIZES_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingPrizes() {
  return {
    type: actionTypes.SET_IS_FETCHING_PRIZES,
  }
}

function fetchPrizesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PRIZES_SUCCESS,
    records,
    filters,
  }
}

function fetchPrizesFailure(error) {
  return {
    type: actionTypes.FETCH_PRIZES_FAILURE,
    error,
  }
}

export function fetchPrizes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPrizes())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${PRIZES_API_PATH}`, params)
      .then(res => dispatch(fetchPrizesSuccess(res.data)))
      .catch(error => dispatch(fetchPrizesFailure(error)))
  }
}

function setIsDeletingPrize(prizeId) {
  return {
    type: actionTypes.SET_IS_DELETING_PRIZE,
    prizeId,
  }
}

function deletePrizeSuccess(record) {
  return {
    type: actionTypes.DELETE_PRIZE_SUCCESS,
    record,
  }
}

function deletePrizeFailure(error, prizeId) {
  return {
    type: actionTypes.DELETE_PRIZE_FAILURE,
    error,
    prizeId,
  }
}

export function deletePrize(prizeId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingPrize(prizeId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${PRIZES_API_PATH}/${prizeId}`)
      .then(res => {
        dispatch(deletePrizeSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('prizeFilters'))
        dispatch(fetchPrizes(filterParams))
      })
      .catch(error => dispatch(deletePrizeFailure(error, prizeId)))
  }
}
