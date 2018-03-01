import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingDomain(domainId) {
  return {
    type: actionTypes.SET_IS_DELETING_DOMAIN,
    domainId,
  }
}

function deleteDomainSuccess(record) {
  return {
    type: actionTypes.DELETE_DOMAIN_SUCCESS,
    record,
  }
}

function deleteDomainFailure(error, domainId) {
  return {
    type: actionTypes.DELETE_DOMAIN_FAILURE,
    error,
    domainId,
  }
}

export function deleteDomain(domainId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingDomain(domainId))
    authRequest
      .deleteEntity(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}`)
      .then(res => {
        dispatch(deleteDomainSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('domainFilters'))
        dispatch(fetchDomains(filterParams))
      })
      .catch(error => dispatch(deleteDomainFailure(error, domainId)))
  }
}