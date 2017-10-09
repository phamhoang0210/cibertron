import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {SOL_BASE_URL, DISCOUNTS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingDiscount() {
  return {
    type: actionTypes.SET_IS_FETCHING_DISCOUNT,
  }
}

function fetchDiscountSuccess(record) {
  return {
    type: actionTypes.FETCH_DISCOUNT_SUCCESS,
    record,
  }
}

function fetchDiscountFailure(error) {
  return {
    type: actionTypes.FETCH_DISCOUNT_FAILURE,
    error,
  }
}

export function fetchDiscount(discountId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDiscount())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${DISCOUNTS_API_PATH}/${discountId}`, params)
      .then(res => dispatch(fetchDiscountSuccess(res.data)))
      .catch(error => dispatch(fetchDiscountFailure(error)))
  }
}

function setIsUpdatingDiscount(discountId) {
  return {
    type: actionTypes.SET_IS_UPDATING_DISCOUNT,
    discountId,
  }
}

function updateDiscountSuccess(record) {
  return {
    type: actionTypes.UPDATE_DISCOUNT_SUCCESS,
    record,
  }
}

function updateDiscountFailure(error, discountId) {
  return {
    type: actionTypes.UPDATE_DISCOUNT_FAILURE,
    error,
    discountId,
  }
}

export function updateDiscount(discountId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingDiscount(discountId))
    authRequest
      .putEntity(`${SOL_BASE_URL}${DISCOUNTS_API_PATH}/${discountId}`, params)
      .then(res => dispatch(updateDiscountSuccess(res.data)))
      .catch(error => dispatch(updateDiscountFailure(error, discountId)))
  }
}