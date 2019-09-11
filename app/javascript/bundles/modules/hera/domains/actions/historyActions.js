import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingDomainHistoryActions() {
  return {
    type: actionTypes.SET_IS_FETCHING_DOMAIN_HISTORY_ACTIONS,
  }
}

function fetchDomainHistoryActionsSuccess(records) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_SUCCESS,
    records,
  }
}

function fetchDomainHistoryActionsFailure(error) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_ACTIONS_FAILURE,
    error,
  }
}

export function fetchDomainHistoryActions(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDomainHistoryActions())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/history_actions`, params)
      .then(res => dispatch(fetchDomainHistoryActionsSuccess(res.data)))
      .catch(error => dispatch(fetchDomainHistoryActionsFailure(error)))
  }
}

function setIsFetchingDomain() {
  return {
    type: actionTypes.SET_IS_FETCHING_DOMAIN,
  }
}

function fetchDomainSuccess(record) {
  return {
    type: actionTypes.FETCH_DOMAIN_SUCCESS,
    record,
  }
}

function fetchDomainFailure(error) {
  return {
    type: actionTypes.FETCH_DOMAIN_FAILURE,
    error,
  }
}

export function fetchDomain(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDomain())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}`, params)
      .then(res => dispatch(fetchDomainSuccess(res.data)))
      .catch(error => dispatch(fetchDomainFailure(error)))
  }
}

function setIsFetchingVersions() {
  return {
    type: actionTypes.SET_IS_FETCHING_VERSIONS,
  }
}

function fetchVersionsSuccess(records) {
  return {
    type: actionTypes.FETCH_VERSIONS_SUCCESS,
    records,
  }
}

function fetchVersionsFailure(error) {
  return {
    type: actionTypes.FETCH_VERSIONS_FAILURE,
    error,
  }
}

export function fetchVersions(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingVersions())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/history_versions`, params)
      .then(res => dispatch(fetchVersionsSuccess(res.data)))
      .catch(error => dispatch(fetchVersionsFailure(error)))
  }
}

function setIsFetchingDomainHistorySwitchs() {
  return {
    type: actionTypes.SET_IS_FETCHING_DOMAIN_HISTORY_SWITCHS,
  }
}

function fetchDomainHistorySwitchsSuccess(records) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_SWITCHS_SUCCESS,
    records,
  }
}

function fetchDomainHistorySwitchsFailure(error) {
  return {
    type: actionTypes.FETCH_DOMAIN_HISTORY_SWITCHS_FAILURE,
    error,
  }
}

export function fetchDomainHistorySwitchs(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingDomainHistorySwitchs())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/history_cnames`, params)
      .then(res => dispatch(fetchDomainHistorySwitchsSuccess(res.data)))
      .catch(error => dispatch(fetchDomainHistorySwitchsFailure(error)))
  }
}
