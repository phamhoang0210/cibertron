import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PROMOS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingPromos() {
  return {
    type: actionTypes.SET_IS_FETCHING_PROMOS,
  }
}

function fetchPromosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PROMOS_SUCCESS,
    records,
    filters,
  }
}

function fetchPromosFailure(error) {
  return {
    type: actionTypes.FETCH_PROMOS_FAILURE,
    error,
  }
}

export function fetchPromos(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPromos())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${PROMOS_API_PATH}`, params)
      .then(res => dispatch(fetchPromosSuccess(res.data)))
      .catch(error => dispatch(fetchPromosFailure(error)))
  }
}

function setIsDeletingPromo(promoId) {
  return {
    type: actionTypes.SET_IS_DELETING_PROMO,
    promoId,
  }
}

function deletePromoSuccess(record) {
  return {
    type: actionTypes.DELETE_PROMO_SUCCESS,
    record,
  }
}

function deletePromoFailure(error, promoId) {
  return {
    type: actionTypes.DELETE_PROMO_FAILURE,
    error,
  }
}

export function deletePromo(promoId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingPromo(promoId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${PROMOS_API_PATH}/${promoId}`)
      .then(res => {
        dispatch(deletePromoSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('promoFilters'))
        dispatch(fetchPromos(filterParams))
      })
      .catch(error => dispatch(deletePromoFailure(error, promoId)))
  }
}