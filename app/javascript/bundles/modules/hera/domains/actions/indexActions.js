import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {DOMAINS_API_PATH} from '../constants/paths'
import {AUTHS_API_PATH, USERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'
import _ from 'lodash'

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
      .then(res => {dispatch(fetchUsers(res.data))})
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

// Fetch users
function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess() {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}


export function fetchUsers(data) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    var list_user_gid = []

    if(data.records){
      data.records.map(record => {
        list_user_gid.push(record.user_gid)
      })
    }
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, {'compconds': {'gid.in': _.uniq(list_user_gid)}})
      .then(res => {
        var users = res.data.records
        const users_array = {}
        if(users) {
          users.map(user => {
            users_array[user.gid] = user.username
          })
        }
        if(data.records && users_array){
          data.records.map(record => {
            record["username"] = users_array[record.user_gid]
          })
        }
        dispatch(fetchUsersSuccess())
        dispatch(fetchDomainsSuccess(data))
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}

//Action for reload landingpage
function setIsReloadingDomain(domainId) {
  return {
    type: actionTypes.SET_IS_RELOADING_DOMAIN,
    domainId,
  }
}

function reloadDomainSuccess(record) {
  return {
    type: actionTypes.RELOAD_DOMAIN_SUCCESS,
    record,
  }
}

function reloadDomainFailure(error, domainId) {
  return {
    type: actionTypes.RELOAD_DOMAIN_FAILURE,
    error,
    domainId,
  }
}

export function reloadDomain(domainId, domainParams, params = {}) {
  return dispatch => {
    dispatch(setIsReloadingDomain(domainId))
    authRequest
      .putEntity(`${HERA_BASE_URL}${DOMAINS_API_PATH}/${domainId}/reload`, params)
      .then(res => {
        dispatch(reloadDomainSuccess(res.data))
        dispatch(fetchDomains(domainParams))
      })
      .catch(error => dispatch(reloadDomainFailure(error, domainId)))
  }
}