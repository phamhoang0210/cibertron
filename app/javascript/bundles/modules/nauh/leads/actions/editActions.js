import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  NAUH_BASE_URL, LEADS_API_PATH, ORDERS_API_PATH, CALL_LOGS_API_PATH, LEAD_EMAIL_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

export function fetchLead(leadId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLead())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEADS_API_PATH}/${leadId}`, params)
      .then(res => dispatch(fetchLeadSuccess(res.data)))
      .catch(error => dispatch(fetchLeadFailure(error)))
  }
}

function setIsFetchingEmailLead() {
  return {
    type: actionTypes.SET_IS_FETCHING_EMAIL_LEAD,
  }
}


function fetchEmailLeadSuccess(record) {
  return {
    type: actionTypes.FETCH_EMAIL_LEAD_SUCCESS,
    record,
  }
}

function fetchEmailLeadFailure(error) {
  return {
    type: actionTypes.FETCH_EMAIL_LEAD_FAILURE,
    error,
  }
}

export function fetchEmailLead(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingEmailLead())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_EMAIL_API_PATH}`, params)
      .then(res => dispatch(fetchEmailLeadSuccess(res.data)))
      .catch(error => dispatch(fetchEmailLeadFailure(error)))
  }
}

function setIsUpdatingLead(leadId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LEAD,
    leadId,
  }
}

function updateLeadSuccess(record) {
  return {
    type: actionTypes.UPDATE_LEAD_SUCCESS,
    record,
  }
}

function updateLeadFailure(error, leadId) {
  return {
    type: actionTypes.UPDATE_LEAD_FAILURE,
    error,
    leadId,
  }
}

export function updateLead(leadId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingLead(leadId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${LEADS_API_PATH}/${leadId}`, params)
      .then(res => dispatch(updateLeadSuccess(res.data)))
      .catch(error => dispatch(updateLeadFailure(error, leadId)))
  }
}

function setIsUpdatingLeadAttr(leadId) {
  return {
    type: actionTypes.SET_IS_UPDATING_LEAD_ATTR,
    leadId,
  }
}

function updateLeadAttrSuccess(record) {
  return {
    type: actionTypes.UPDATE_LEAD_ATTR_SUCCESS,
    record,
  }
}

function updateLeadAttrFailure(error, leadId) {
  return {
    type: actionTypes.UPDATE_LEAD_ATTR_FAILURE,
    error,
    leadId,
  }
}

export function updateLeadAttr(leadId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingLeadAttr(leadId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${LEADS_API_PATH}/${leadId}`, params)
      .then(res => dispatch(updateLeadAttrSuccess(res.data)))
      .catch(error => dispatch(updateLeadAttrFailure(error, leadId)))
  }
}

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
  return (dispatch, getStore) => {
    dispatch(setIsCreatingOrder())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${ORDERS_API_PATH}`, params)
      .then(res => {
        dispatch(createOrderSucces(res.data))
        const filterParams = getFilterParams(getStore().editState.get('orderFilters'))
        dispatch(fetchOrders(filterParams))
      })
      .catch(error => dispatch(createOrderFailure(error)))
  }
}


function setIsCalling() {
  return {
    type: actionTypes.SET_IS_CALLING,
  }
}

function callSucces(record) {
  return {
    type: actionTypes.CALL_SUCCESS,
    record
  }
}

function callFailure(error) {
  return {
    type: actionTypes.CALL_FAILURE,
    error,
  }
}

export function call(leadId) {
  return dispatch => {
    dispatch(setIsCalling())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${LEADS_API_PATH}/call`, {id: leadId})
      .then(res => dispatch(callSucces(res.data)))
      .catch(error => dispatch(callFailure(error)))
  }
}

function setIsFetchingCallLogs() {
  return {
    type: actionTypes.SET_IS_FETCHING_CALL_LOGS,
  }
}

function fetchCallLogsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CALL_LOGS_SUCCESS,
    records,
    filters,
  }
}

function fetchCallLogsFailure(error) {
  return {
    type: actionTypes.FETCH_CALL_LOGS_FAILURE,
    error,
  }
}

export function fetchCallLogs(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCallLogs())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${CALL_LOGS_API_PATH}`, params)
      .then(res => dispatch(fetchCallLogsSuccess(res.data)))
      .catch(error => dispatch(fetchCallLogsFailure(error)))
  }
}


function setIsUpdatingCallLog(callLogId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CALL_LOG,
    callLogId,
  }
}

function updateCallLogSuccess(record) {
  return {
    type: actionTypes.UPDATE_CALL_LOG_SUCCESS,
    record,
  }
}

function updateCallLogFailure(error, callLogId) {
  return {
    type: actionTypes.UPDATE_CALL_LOG_FAILURE,
    error,
    callLogId,
  }
}

export function updateCallLog(callLogId, params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsUpdatingCallLog(callLogId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${CALL_LOGS_API_PATH}/${callLogId}`, params)
      .then(res => {
        dispatch(updateCallLogSuccess(res.data))
        const filterParams = getFilterParams(getStore().editState.get('callLogFilters'))
        dispatch(fetchCallLogs(filterParams))
      })
      .catch(error => dispatch(updateCallLogFailure(error, callLogId)))
  }
}
