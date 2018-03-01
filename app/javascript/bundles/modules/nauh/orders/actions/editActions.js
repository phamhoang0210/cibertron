import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {ORDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingOrder() {
  return {
    type: actionTypes.SET_IS_FETCHING_ORDER,
  }
}

function fetchOrderSuccess(record) {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    record,
  }
}

function fetchOrderFailure(error) {
  return {
    type: actionTypes.FETCH_ORDER_FAILURE,
    error,
  }
}

export function fetchOrder(orderId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingOrder())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${ORDERS_API_PATH}/${orderId}`, params)
      .then(res => dispatch(fetchOrderSuccess(res.data)))
      .catch(error => dispatch(fetchOrderFailure(error)))
  }
}

function setIsUpdatingOrder(orderId) {
  return {
    type: actionTypes.SET_IS_UPDATING_ORDER,
    orderId,
  }
}

function updateOrderSuccess(record) {
  return {
    type: actionTypes.UPDATE_ORDER_SUCCESS,
    record,
  }
}

function updateOrderFailure(error, orderId) {
  return {
    type: actionTypes.UPDATE_ORDER_FAILURE,
    error,
    orderId,
  }
}

export function updateOrder(orderId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingOrder(orderId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${ORDERS_API_PATH}/${orderId}`, params)
      .then(res => dispatch(updateOrderSuccess(res.data)))
      .catch(error => dispatch(updateOrderFailure(error, orderId)))
  }
}