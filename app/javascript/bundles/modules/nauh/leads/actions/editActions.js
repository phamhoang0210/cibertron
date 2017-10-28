import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  NAUH_BASE_URL, LEADS_API_PATH, ORDERS_API_PATH, LEAD_CARE_HISTORIES_API_PATH,
  ORDERS_PURCHASE_HISTORY_API_PATH, EROS_BASE_URL, UPDATE_LEAD_CARE_HISTORIES_API_PATH
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

function setIsFetchingLeadCareHistories() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_CARE_HISTORIES,
  }
}

function fetchLeadCareHistoriesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_CARE_HISTORIES_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadCareHistoriesFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_CARE_HISTORIES_FAILURE,
    error,
  }
}

export function fetchLeadCareHistories(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadCareHistories())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_CARE_HISTORIES_API_PATH}`, params)
      .then(res => dispatch(fetchLeadCareHistoriesSuccess(res.data)))
      .catch(error => dispatch(fetchLeadCareHistoriesFailure(error)))
  }
}


function setIsUpdatingLeadCareHistory() {
  return {
    type: actionTypes.SET_IS_UPDATING_LEAD_CARE_HISTORY,
  }
}

function updateLeadCareHistorySuccess(record) {
  return {
    type: actionTypes.UPDATE_LEAD_CARE_HISTORY_SUCCESS,
    record,
  }
}

function updateLeadCareHistoryFailure(error) {
  return {
    type: actionTypes.UPDATE_LEAD_CARE_HISTORY_FAILURE,
    error,
  }
}

export function updateLeadCareHistory(params = {}) {
  return (dispatch, getStore) => {
    dispatch(setIsUpdatingLeadCareHistory())
    authRequest
      .submitEntity(`${NAUH_BASE_URL}${UPDATE_LEAD_CARE_HISTORIES_API_PATH}`, params)
      .then(res => {
        dispatch(updateLeadCareHistorySuccess(res.data))
        const {editState} = getStore()
        const filterParams = getFilterParams(editState.get('leadCareHistoryFilters'))
        const lead = editState.get('lead')
        
        dispatch(fetchLeadCareHistories(filterParams))
        dispatch(fetchLead(lead.get('id'), editState.get('defaultLeadParams').toJS()))
      })
      .catch(error => dispatch(updateLeadCareHistoryFailure(error)))
  }
}

function setIsFetchingErosOrders() {
  return {
    type: actionTypes.SET_IS_FETCHING_EROS_ORDERS,
  }
}

function fetchErosOrdersSuccess({records}) {
  return {
    type: actionTypes.FETCH_EROS_ORDERS_SUCCESS,
    records,
  }
}

function fetchErosOrdersFailure(error) {
  return {
    type: actionTypes.FETCH_EROS_ORDERS_FAILURE,
    error,
  }
}

export function fetchErosOrders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingErosOrders())
    authRequest
      .fetchEntities(`${EROS_BASE_URL}${ORDERS_PURCHASE_HISTORY_API_PATH}`, params)
      .then(res => dispatch(fetchErosOrdersSuccess(res.data)))
      .catch(error => dispatch(fetchErosOrdersFailure(error)))
  }
}