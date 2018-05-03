import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PRICES_API_PATH, LEADS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingPrice() {
  return {
    type: actionTypes.SET_IS_CREATING_PRICE,
  }
}

function createPriceSucces(record) {
  return {
    type: actionTypes.CREATE_PRICE_SUCCESS,
    record
  }
}

function createPriceFailure(error) {
  return {
    type: actionTypes.CREATE_PRICE_FAILURE,
    error,
  }
}

export function createPrice(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingPrice())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${PRICES_API_PATH}`, params)
      .then(res => dispatch(createPriceSucces(res.data)))
      .catch(error => dispatch(createPriceFailure(error)))
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