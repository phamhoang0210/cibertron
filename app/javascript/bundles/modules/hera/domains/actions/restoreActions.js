import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
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

function setIsUpdatingDomain(domainId) {
  return {
    type: actionTypes.SET_IS_UPDATING_DOMAIN,
    domainId,
  }
}

function updateDomainSuccess(record) {
  return {
    type: actionTypes.UPDATE_DOMAIN_SUCCESS,
    record,
  }
}

function updateDomainFailure(error, domainId) {
  return {
    type: actionTypes.UPDATE_DOMAIN_FAILURE,
    error,
    domainId,
  }
}

export function updateDomain(domainId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingDomain(domainId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/restore`, params)
      .then(res => dispatch(updateDomainSuccess(res.data)))
      .catch(error => dispatch(updateDomainFailure(error, domainId)))
  }
}