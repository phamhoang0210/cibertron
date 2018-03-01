import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  LEAD_LEVELS_API_PATH, CATEGORIES_API_PATH, COURSES_API_PATH,
  USERS_API_PATH, LEAD_STATUSES_API_PATH, COMBOS_API_PATH,
  LEADS_API_PATH, CAMPAIGNS_API_PATH, PAYMENT_METHODS_API_PATH,
  PROVINCES_API_PATH, LEAD_CARE_STATUSES_API_PATH, SEXES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingLeadLevels() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_LEVELS,
  }
}

function fetchLeadLevelsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_LEVELS_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadLevelsFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_LEVELS_FAILURE,
    error,
  }
}

export function fetchLeadLevels(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadLevels())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_LEVELS_API_PATH}`, params)
      .then(res => dispatch(fetchLeadLevelsSuccess(res.data)))
      .catch(error => dispatch(fetchLeadLevelsFailure(error)))
  }
}


function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, params)
      .then(res => dispatch(fetchUsersSuccess(res.data)))
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}

function setIsFetchingLeadStatuses() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_STATUSES,
  }
}

function fetchLeadStatusesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_STATUSES_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadStatusesFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_STATUSES_FAILURE,
    error,
  }
}

export function fetchLeadStatuses(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadStatuses())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_STATUSES_API_PATH}`, params)
      .then(res => dispatch(fetchLeadStatusesSuccess(res.data)))
      .catch(error => dispatch(fetchLeadStatusesFailure(error)))
  }
}

function setIsFetchingCampaigns() {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGNS,
  }
}

function fetchCampaignsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CAMPAIGNS_SUCCESS,
    records,
    filters,
  }
}

function fetchCampaignsFailure(error) {
  return {
    type: actionTypes.FETCH_CAMPAIGNS_FAILURE,
    error,
  }
}

export function fetchCampaigns(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaigns())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
      .then(res => dispatch(fetchCampaignsSuccess(res.data)))
      .catch(error => dispatch(fetchCampaignsFailure(error)))
  }
}

function setIsFetchingPaymentMethods() {
  return {
    type: actionTypes.SET_IS_FETCHING_PAYMENT_METHODS,
  }
}

function fetchPaymentMethodsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PAYMENT_METHODS_SUCCESS,
    records,
    filters,
  }
}

function fetchPaymentMethodsFailure(error) {
  return {
    type: actionTypes.FETCH_PAYMENT_METHODS_FAILURE,
    error,
  }
}

export function fetchPaymentMethods(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingPaymentMethods())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${PAYMENT_METHODS_API_PATH}`, params)
      .then(res => dispatch(fetchPaymentMethodsSuccess(res.data)))
      .catch(error => dispatch(fetchPaymentMethodsFailure(error)))
  }
}

function setIsFetchingCourses() {
  return {
    type: actionTypes.SET_IS_FETCHING_COURSES,
  }
}

function fetchCoursesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COURSES_SUCCESS,
    records,
    filters,
  }
}

function fetchCoursesFailure(error) {
  return {
    type: actionTypes.FETCH_COURSES_FAILURE,
    error,
  }
}

export function fetchCourses(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCourses())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COURSES_API_PATH}`, params)
      .then(res => dispatch(fetchCoursesSuccess(res.data)))
      .catch(error => dispatch(fetchCoursesFailure(error)))
  }
}

function setIsFetchingCombos() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMBOS,
  }
}

function fetchCombosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COMBOS_SUCCESS,
    records,
    filters,
  }
}

function fetchCombosFailure(error) {
  return {
    type: actionTypes.FETCH_COMBOS_FAILURE,
    error,
  }
}

export function fetchCombos(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCombos())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COMBOS_API_PATH}`, params)
      .then(res => dispatch(fetchCombosSuccess(res.data)))
      .catch(error => dispatch(fetchCombosFailure(error)))
  }
}

function setIsFetchingProvinces() {
  return {
    type: actionTypes.SET_IS_FETCHING_PROVINCES,
  }
}

function fetchProvincesSuccess({provinces, filters}) {
  return {
    type: actionTypes.FETCH_PROVINCES_SUCCESS,
    records: provinces,
    filters,
  }
}

function fetchProvincesFailure(error) {
  return {
    type: actionTypes.FETCH_PROVINCES_FAILURE,
    error,
  }
}

export function fetchProvinces(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingProvinces())
    authRequest
      .fetchEntities(`${GAMBIT_BASE_URL}${PROVINCES_API_PATH}`, params)
      .then(res => dispatch(fetchProvincesSuccess(res.data)))
      .catch(error => dispatch(fetchProvincesFailure(error)))
  }
}

function setIsFetchingLeadCareStatuses() {
  return {
    type: actionTypes.SET_IS_FETCHING_LEAD_CARE_STATUSES,
  }
}

function fetchLeadCareStatusesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LEAD_CARE_STATUSES_SUCCESS,
    records,
    filters,
  }
}

function fetchLeadCareStatusesFailure(error) {
  return {
    type: actionTypes.FETCH_LEAD_CARE_STATUSES_FAILURE,
    error,
  }
}

export function fetchLeadCareStatuses(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLeadCareStatuses())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${LEAD_CARE_STATUSES_API_PATH}`, params)
      .then(res => dispatch(fetchLeadCareStatusesSuccess(res.data)))
      .catch(error => dispatch(fetchLeadCareStatusesFailure(error)))
  }
}

function setIsFetchingSexes() {
  return {
    type: actionTypes.SET_IS_FETCHING_SEXES,
  }
}

function fetchSexesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SEXES_SUCCESS,
    records,
    filters,
  }
}

function fetchSexesFailure(error) {
  return {
    type: actionTypes.FETCH_SEXES_FAILURE,
    error,
  }
}

export function fetchSexes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSexes())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${SEXES_API_PATH}`, params)
      .then(res => dispatch(fetchSexesSuccess(res.data)))
      .catch(error => dispatch(fetchSexesFailure(error)))
  }
}