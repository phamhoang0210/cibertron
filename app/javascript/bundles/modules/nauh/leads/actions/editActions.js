import authRequest from 'libs/requests/authRequest'
import requestManager from 'axios'
import * as actionTypes from '../constants/actionTypes'
import {
  LEADS_API_PATH, ORDERS_API_PATH, LEAD_CARE_HISTORIES_API_PATH,
  ORDERS_PURCHASE_HISTORY_API_PATH, UPDATE_LEAD_CARE_HISTORIES_API_PATH,
  LEAD_TEMPLATE_EMAIL_API_PATH,LEAD_SEND_EMAIL_API_PATH, CALL_LOG_GET_AUDIO_LINK_PATH,
  L8_REPORT_API_PATH, RECOMMENDATION_API, RECOMMENDATION_CREATE_PATH, RECOMMENDATION_GET_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'


function setIsFetchingL8Report() {
  return {
    type: actionTypes.SET_IS_FETCHING_L8_REPORT,
  }
}

function fetchL8ReportSuccess(data) {
  return {
    type: actionTypes.FETCH_L8_REPORT_SUCESS,
    data,
  }
}

function fetchL8ReportFailure(error) {
  return {
    type: actionTypes.FETCH_L8_REPORT_FAILURE,
    error,
  }
}

export function fetchL8Report(params) {
  return dispatch => {
    dispatch(setIsFetchingL8Report())
    authRequest
      .fetchEntities(`${EROS_BASE_URL}${L8_REPORT_API_PATH}`, params)
      .then(res => dispatch(fetchL8ReportSuccess(res.data)))
      .catch(error => dispatch(fetchL8ReportFailure(error)))
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
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_TEMPLATE_EMAIL_API_PATH}`, params)
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

export function sendEmail(params) {
  return dispatch => {
    authRequest
      .submitEntity(`${NAUH_BASE_URL}${LEAD_SEND_EMAIL_API_PATH}`, params)
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

function setIsFetchingCallLogAudioLink(leadCareHistoryId) {
  return {
    type: actionTypes.SET_IS_FETCHING_CALL_LOG_AUDIO_LINK,
    leadCareHistoryId,
  }
}
function fetchCallLogAudioLinkSuccess(leadCareHistoryId, {audio_link}) {
  return {
    type: actionTypes.FETCH_CALL_LOG_AUDIO_LINK_SUCCESS,
    leadCareHistoryId,
    audio_link,
  }
}
function fetchCallLogAudioLinkFailure(leadCareHistoryId, error) {
  return {
    type: actionTypes.FETCH_CALL_LOG_AUDIO_LINK_FAILURE,
    leadCareHistoryId,
    error,
  }
}

export function fetchCallLogAudioLink(leadCareHistoryId) {
  return dispatch => {
    dispatch(setIsFetchingCallLogAudioLink(leadCareHistoryId))

    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${CALL_LOG_GET_AUDIO_LINK_PATH}`, {id: leadCareHistoryId})
      .then(res => dispatch(fetchCallLogAudioLinkSuccess(leadCareHistoryId, res.data)))
      .catch(error => dispatch(fetchCallLogAudioLinkFailure(leadCareHistoryId, error)))
  }
}

// Get Recommend from Nauth
function setIsFetchingRecommendationNauh() {
  return {
    type: actionTypes.SET_IS_FETCHING_RECOMMENDATION_NAUH,
  }
}

function fetchRecommendationSuccessNauh(data) {
  return {
    type: actionTypes.FETCH_RECOMMENDATION_SUCESS_NAUH,
    data,
  }
}

function fetchRecommendationFailureNauh(error) {
  return {
    type: actionTypes.FETCH_RECOMMENDATION_FAILURE_NAUH,
    error,
  }
}

export function fetchRecommendationNauh(lead_id) {
  return dispatch => {
    dispatch(setIsFetchingRecommendationNauh())

    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${RECOMMENDATION_GET_PATH}?id=${lead_id}`)
      .then(res => dispatch(fetchRecommendationSuccessNauh(res.data)))
      .catch(error => dispatch(fetchRecommendationFailureNauh(error)))
  }
}

// Get Recommend from eros
function setIsFetchingRecommendation() {
  return {
    type: actionTypes.SET_IS_FETCHING_RECOMMENDATION,
  }
}

function fetchRecommendationSuccess(data) {
  return {
    type: actionTypes.FETCH_RECOMMENDATION_SUCESS,
    data,
  }
}

function fetchRecommendationFailure(error) {
  return {
    type: actionTypes.FETCH_RECOMMENDATION_FAILURE,
    error,
  }
}

export function fetchRecommendation(input, limit) {
  return dispatch => {
    dispatch(setIsFetchingRecommendation())

    requestManager
      .get(`${RECOMMENDATION_API}?q=${input}&limit=${limit}`)
      .then(res => dispatch(fetchRecommendationSuccess(res.data)))
      .catch(error => dispatch(fetchRecommendationFailure(error)))
  }
}

// Create Recommend
function setIsCreateRecommendation() {
  return {
    type: actionTypes.SET_IS_CREATE_RECOMMENDATION,
  }
}

function createRecommendationSuccess(data) {
  return {
    type: actionTypes.CREATE_RECOMMENDATION_SUCESS,
    data,
  }
}

function createRecommendationFailure(error) {
  return {
    type: actionTypes.CREATE_RECOMMENDATION_FAILURE,
    error,
  }
}

export function createRecommendation(params) {
  return dispatch => {
    dispatch(setIsCreateRecommendation())

    authRequest
      .submitEntity(`${NAUH_BASE_URL}${RECOMMENDATION_CREATE_PATH}`, params)
      .then(res => dispatch(createRecommendationSuccess(res.data)))
      .catch(error => dispatch(createRecommendationFailure(error)))
  }
}
