import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  PROVIDERS_API_PATH, CATEGORIES_API_PATH, DISCOUNT_API_PATH,
  COMBOS_API_PATH, AUTH_API_PATH, DOMAINS_API_PATH,
  LOGICS_API_PATH, AD_ACCOUNTS_API_PATH, PIXELS_API_PATH,
  FACEBOOK_APPS_API_PATH, FACEBOOK_PIXEL_CODES_API_PATH,
  LOGIC_HOME_API_PATH,
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'


function setIsFetchingDiscounts() {
  return {
    type: actionTypes.SET_IS_FETCHING_DISCOUNT,
  }
}

function fetchDiscountsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_DISCOUNT_SUCCESS,
    records,
    filters,
  }
}

function fetchDiscountsFailure(error) {
  return {
    type: actionTypes.FETCH_DISCOUNT_FAILURE,
    error,
  }
}

export function fetchDiscounts(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDiscounts())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${DISCOUNT_API_PATH}`, params)
      .then(res => dispatch(fetchDiscountsSuccess(res.data)))
      .catch(error => dispatch(fetchDiscountsFailure(error)))
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
      .fetchEntities(`${AUTHSERVICE_BASE_URL}${AUTH_API_PATH}`, params)
      .then(res => dispatch(fetchUsersSuccess(res.data)))
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}

function setIsFetchingDomains() {
  return {
    type: actionTypes.SET_IS_FETCHING_DOMAINS,
  }
}

function fetchDomainsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_DOMAINS_SUCCESS,
    records,
    filters,
  }
}

function fetchDomainsFailure(error) {
  return {
    type: actionTypes.FETCH_DOMAINS_FAILURE,
    error,
  }
}

export function fetchDomains(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDomains())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}`, params)
      .then(res => dispatch(fetchDomainsSuccess(res.data)))
      .catch(error => dispatch(fetchDomainsFailure(error)))
  }
}

function setIsFetchingFacebookApps() {
  return {
    type: actionTypes.SET_IS_FETCHING_FACEBOOK_APPS,
  }
}

function fetchFacebookAppsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_FACEBOOK_APPS_SUCCESS,
    records,
    filters,
  }
}

function fetchFacebookAppsFailure(error) {
  return {
    type: actionTypes.FETCH_FACEBOOK_APPS_FAILURE,
    error,
  }
}

export function fetchFacebookApps(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingFacebookApps())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${FACEBOOK_APPS_API_PATH}`, params)
      .then(res => dispatch(fetchFacebookAppsSuccess(res.data)))
      .catch(error => dispatch(fetchFacebookAppsFailure(error)))
  }
}

function setIsFetchingFacebookPixelCodes() {
  return {
    type: actionTypes.SET_IS_FETCHING_FACEBOOK_PIXEL_CODES,
  }
}

function fetchFacebookPixelCodesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_FACEBOOK_PIXEL_CODES_SUCCESS,
    records,
    filters,
  }
}

function fetchFacebookPixelCodesFailure(error) {
  return {
    type: actionTypes.FETCH_FACEBOOK_PIXEL_CODES_FAILURE,
    error,
  }
}

export function fetchFacebookPixelCodes(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingFacebookPixelCodes())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${FACEBOOK_PIXEL_CODES_API_PATH}`, params)
      .then(res => dispatch(fetchFacebookPixelCodesSuccess(res.data)))
      .catch(error => dispatch(fetchFacebookPixelCodesFailure(error)))
  }
}

function setIsFetchingLogics() {
  return {
    type: actionTypes.SET_IS_FETCHING_LOGICS,
  }
}

function fetchLogicsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_LOGICS_SUCCESS,
    records,
    filters,
  }
}

function fetchLogicsFailure(error) {
  return {
    type: actionTypes.FETCH_LOGICS_FAILURE,
    error,
  }
}

export function fetchLogics(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLogics())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LOGICS_API_PATH}`, params)
      .then(res => dispatch(fetchLogicsSuccess(res.data)))
      .catch(error => dispatch(fetchLogicsFailure(error)))
  }
}

// Fetch Adaccount

function setIsFetchingAdAccounts() {
  return {
    type: actionTypes.SET_IS_FETCHING_AD_ACCOUNTS,
  }
}

function fetchAdAccountsSuccess(records) {
  return {
    type: actionTypes.FETCH_AD_ACCOUNTS_SUCCESS,
    records
  }
}

function fetchAdAccountsFailure(error) {
  return {
    type: actionTypes.FETCH_AD_ACCOUNTS_FAILURE,
    error,
  }
}

export function fetchAdAccounts(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAdAccounts())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${AD_ACCOUNTS_API_PATH}`, params)
      .then(res => dispatch(fetchAdAccountsSuccess(res.data)))
      .catch(error => dispatch(fetchAdAccountsFailure(error)))
  }
}

//Fetch pixels

function setIsFetchingPixels() {
  return {
    type: actionTypes.SET_IS_FETCHING_PIXELS,
  }
}

function fetchPixelsSuccess(records) {
  return {
    type: actionTypes.FETCH_PIXELS_SUCCESS,
    records
  }
}

function fetchPixelsFailure(error) {
  return {
    type: actionTypes.FETCH_PIXELS_FAILURE,
    error,
  }
}

export function fetchPixels(params = {}) {
  let filter  = {}
  filter['account_id'] = params
  return dispatch => {
    dispatch(setIsFetchingPixels())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${PIXELS_API_PATH}`, filter)
      .then(res => dispatch(fetchPixelsSuccess(res.data)))
      .catch(error => dispatch(fetchPixelsFailure(error)))
  }
}

//Fetch code logic home

function setIsFetchingLogicHome() {
  return {
    type: actionTypes.SET_IS_FETCHING_LOGIC_HOME,
  }
}

function fetchLogicHomeSuccess(record) {
  return {
    type: actionTypes.FETCH_LOGIC_HOME_SUCCESS,
    record
  }
}

function fetchLogicHomeFailure(error) {
  return {
    type: actionTypes.FETCH_LOGIC_HOME_FAILURE,
    error,
  }
}

export function fetchLogicHome(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLogicHome())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LOGIC_HOME_API_PATH}`, params)
      .then(res => dispatch(fetchLogicHomeSuccess(res.data)))
      .catch(error => dispatch(fetchLogicHomeFailure(error)))
  }
}