import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PRICES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingPrices() {
  return {
    type: actionTypes.SET_IS_FETCHING_PRICES,
  }
}

function fetchPricesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PRICES_SUCCESS,
    records,
    filters,
  }
}

function fetchPricesFailure(error) {
  return {
    type: actionTypes.FETCH_PRICES_FAILURE,
    error,
  }
}

export function fetchPrices(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPrices())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${PRICES_API_PATH}`, null)
      .then(res => dispatch(fetchPricesSuccess(res.data)))
      .catch(error => dispatch(fetchPricesFailure(error)))
  }
}

function setIsDeletingPrice(priceId) {
  return {
    type: actionTypes.SET_IS_DELETING_PRICE,
    priceId,
  }
}

function deletePriceSuccess(record) {
  return {
    type: actionTypes.DELETE_PRICE_SUCCESS,
    record,
  }
}

function deletePriceFailure(error, priceId) {
  return {
    type: actionTypes.DELETE_PRICE_FAILURE,
    error,
    priceId,
  }
}

export function deletePrice(priceId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingPrice(priceId))
    authRequest
      .deleteEntity(`${NAUH_BASE_URL}${PRICES_API_PATH}/${priceId}`)
      .then(res => {
        dispatch(deletePriceSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('priceFilters'))
        dispatch(fetchPrices(filterParams))
      })
      .catch(error => dispatch(deletePriceFailure(error, priceId)))
  }
}