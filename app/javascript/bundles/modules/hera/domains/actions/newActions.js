import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingDomain() {
  return {
    type: actionTypes.SET_IS_CREATING_DOMAIN,
  }
}

function createDomainSucces(record) {
  return {
    type: actionTypes.CREATE_DOMAIN_SUCCESS,
    record
  }
}

function createDomainFailure(error) {
  return {
    type: actionTypes.CREATE_DOMAIN_FAILURE,
    error,
  }
}

export function createDomain(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingDomain())

    return authRequest
      .submitEntity(`${HERA_BASE_URL}${DOMAINS_API_PATH}`, params)
      .then(res => dispatch(createDomainSucces(res.data)))
      .catch(error => dispatch(createDomainFailure(error)))
  }
}

function setIsFetchingSwapDomains() {
  return {
    type: actionTypes.SET_IS_FETCHING_SWAP_DOMAINS,
  }
}

function fetchSwapDomainsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_SWAP_DOMAINS_SUCCESS,
    records,
    filters,
  }
}

function fetchSwapDomainsFailure(error) {
  return {
    type: actionTypes.FETCH_SWAP_DOMAINS_FAILURE,
    error,
  }
}

export function fetchSwapDomains(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSwapDomains())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${DOMAINS_API_PATH}`, params)
      .then(res => dispatch(fetchSwapDomainsSuccess(res.data)))
      .catch(error => dispatch(fetchSwapDomainsFailure(error)))
  }
}