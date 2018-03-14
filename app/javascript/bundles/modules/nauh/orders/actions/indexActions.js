import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {ORDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingOrders() {
  return {
    type: actionTypes.SET_IS_FETCHING_ORDERS,
  }
}

function fetchOrdersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchOrdersFailure(error) {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error,
  }
}

export function fetchOrders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingOrders())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${ORDERS_API_PATH}`, params)
      .then(res => dispatch(fetchOrdersSuccess(res.data)))
      .catch(error => dispatch(fetchOrdersFailure(error)))
  }
}

function setIsDeletingOrder(orderId) {
  return {
    type: actionTypes.SET_IS_DELETING_ORDER,
    orderId,
  }
}

function deleteOrderSuccess(record) {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    record,
  }
}

function deleteOrderFailure(error, orderId) {
  return {
    type: actionTypes.DELETE_ORDER_FAILURE,
    error,
    orderId,
  }
}

export function deleteOrder(orderId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingOrder(orderId))
    authRequest
      .deleteEntity(`${NAUH_BASE_URL}${ORDERS_API_PATH}/${orderId}`)
      .then(res => {
        dispatch(deleteOrderSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('orderFilters'))
        dispatch(fetchOrders(filterParams))
      })
      .catch(error => dispatch(deleteOrderFailure(error, orderId)))
  }
}