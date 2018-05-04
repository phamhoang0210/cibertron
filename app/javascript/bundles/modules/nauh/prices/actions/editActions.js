import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PRICES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingPrice() {
  return {
    type: actionTypes.SET_IS_FETCHING_PRICE,
  }
}

function fetchPriceSuccess(record) {
  return {
    type: actionTypes.FETCH_PRICE_SUCCESS,
    record,
  }
}

function fetchPriceFailure(error) {
  return {
    type: actionTypes.FETCH_PRICE_FAILURE,
    error,
  }
}

export function fetchPrice(priceId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPrice())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${PRICES_API_PATH}/${priceId}`, params)
      .then(res => dispatch(fetchPriceSuccess(res.data)))
      .catch(error => dispatch(fetchPriceFailure(error)))
  }
}

function setIsUpdatingPrice(priceId) {
  return {
    type: actionTypes.SET_IS_UPDATING_PRICE,
    priceId,
  }
}

function updatePriceSuccess(record) {
  return {
    type: actionTypes.UPDATE_PRICE_SUCCESS,
    record,
  }
}

function updatePriceFailure(error, priceId) {
  return {
    type: actionTypes.UPDATE_PRICE_FAILURE,
    error,
    priceId,
  }
}

export function updatePrice(priceId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingPrice(priceId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${PRICES_API_PATH}/${priceId}`, params)
      .then(res => dispatch(updatePriceSuccess(res.data)))
      .catch(error => dispatch(updatePriceFailure(error, priceId)))
  }
}