import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {ORDERS_API_PATH, LEADS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingOrder() {
  return {
    type: actionTypes.SET_IS_CREATING_ORDER,
  }
}

function createOrderSucces(record) {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    record
  }
}

function createOrderFailure(error) {
  return {
    type: actionTypes.CREATE_ORDER_FAILURE,
    error,
  }
}

export function createOrder(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingOrder())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${ORDERS_API_PATH}`, params)
      .then(res => dispatch(createOrderSucces(res.data)))
      .catch(error => dispatch(createOrderFailure(error)))
  }
}


function setIsFetchingLead() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD,
  }
}

function fetchLeadSuccess(record) {
  return {
    type: actionTypes.FETCH_LEAD_SUCCESS,
    record,
  }
}

function fetchLeadFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_FAILURE,
    error,
  }
}

export function fetchLead(id, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLead())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEADS_API_PATH}/${id}`, params)
      .then(res => dispatch(fetchLeadSuccess(res.data)))
      .catch(error => dispatch(fetchLeadFailure(error)))
  }
}