import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
export * from './sharedActions'


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
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/versions`, params)
      .then(res => dispatch(fetchVersionsSuccess(res.data)))
      .catch(error => dispatch(fetchVersionsFailure(error)))
  }
}