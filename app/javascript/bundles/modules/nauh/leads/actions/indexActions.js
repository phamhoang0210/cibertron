import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  NAUH_BASE_URL, LEADS_API_PATH, ORDERS_API_PATH,
  EMAIL_LEADS_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLeads() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEADS,
  }
}

function fetchLeadsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEADS_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadsFailure(error) {
  return {
    type: actionTypes.FETCH_LEADS_FAILURE,
    error,
  }
}

export function fetchLeads(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeads())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEADS_API_PATH}`, params)
      .then(res => dispatch(fetchLeadsSuccess(res.data)))
      .catch(error => dispatch(fetchLeadsFailure(error)))
  }
}

function setIsDeletingLead(leadId) {
  return {
    type: actionTypes.SET_IS_DELETING_LEAD,
    leadId,
  }
}

function deleteLeadSuccess(record) {
  return {
    type: actionTypes.DELETE_LEAD_SUCCESS,
    record,
  }
}

function deleteLeadFailure(error, leadId) {
  return {
    type: actionTypes.DELETE_LEAD_FAILURE,
    error,
    leadId,
  }
}

export function deleteLead(leadId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingLead(leadId))
    authRequest
      .deleteEntity(`${NAUH_BASE_URL}${LEADS_API_PATH}/${leadId}`)
      .then(res => {
        dispatch(deleteLeadSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('leadFilters'))
        dispatch(fetchLeads(filterParams))
      })
      .catch(error => dispatch(deleteLeadFailure(error, leadId)))
  }
}

function setIsFetchingLeadOrders(lead) {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_ORDERS,
    lead,
  }
}

function fetchLeadOrdersSuccess(lead, {records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_ORDERS_SUCCESS,
    lead,
    records,
    filters,
  }
}

function fetchLeadOrdersFailure(lead, error) {
  return {
    type: actionTypes.FETCH_LEAD_ORDERS_FAILURE,
    lead,
    error,
  }
}

export function fetchLeadOrders(lead, params) {
  return dispatch => {
    dispatch(setIsFetchingLeadOrders(lead))
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${ORDERS_API_PATH}`, params)
      .then(res => dispatch(fetchLeadOrdersSuccess(lead, res.data)))
      .catch(error => dispatch(fetchLeadOrdersFailure(lead, error)))
  }
}

function setIsFetchingEmailLeads(lead) {
  return {
    type: actionTypes.SET_IS_FETCHING_EMAIL_LEADS,
    lead,
  }
}

function fetchEmailLeadsSuccess(lead, {records, filters}) {
  return {
    type: actionTypes.FETCH_EMAIL_LEADS_SUCCESS,
    lead,
    records,
    filters,
  }
}

function fetchEmailLeadsFailure(lead, error) {
  return {
    type: actionTypes.FETCH_EMAIL_LEADS_FAILURE,
    lead,
    error,
  }
}

export function fetchEmailLeads(lead, params) {
  return dispatch => {
    dispatch(setIsFetchingEmailLeads(lead))
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${EMAIL_LEADS_API_PATH}`, params)
      .then(res => dispatch(fetchEmailLeadsSuccess(lead, res.data)))
      .catch(error => dispatch(fetchEmailLeadsFailure(lead, error)))
  }
}