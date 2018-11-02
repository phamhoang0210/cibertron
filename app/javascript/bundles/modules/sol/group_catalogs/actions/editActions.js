import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {GROUP_CATALOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingGroupCatalog() {
  return {
    type: actionTypes.SET_IS_FETCHING_GROUP_CATALOG,
  }
}

function fetchGroupCatalogSuccess(record) {
  return {
    type: actionTypes.FETCH_GROUP_CATALOG_SUCCESS,
    record,
  }
}

function fetchGroupCatalogFailure(error) {
  return {
    type: actionTypes.FETCH_GROUP_CATALOG_FAILURE,
    error,
  }
}

export function fetchGroupCatalog(groupCatalogId, params) {
  return dispatch => {
    dispatch(setIsFetchingGroupCatalog())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${GROUP_CATALOGS_API_PATH}/${groupCatalogId}`, params)
      .then(res => dispatch(fetchGroupCatalogSuccess(res.data)))
      .catch(error => dispatch(fetchGroupCatalogFailure(error)))
  }
}

function setIsUpdatingGroupCatalog(groupCatalogId) {
  return {
    type: actionTypes.SET_IS_UPDATING_GROUP_CATALOG,
    groupCatalogId,
  }
}

function updateGroupCatalogSuccess(record) {
  return {
    type: actionTypes.UPDATE_GROUP_CATALOG_SUCCESS,
    record,
  }
}

function updateGroupCatalogFailure(error, groupcatalogId) {
  return {
    type: actionTypes.UPDATE_GROUP_CATALOG_FAILURE,
    error,
    groupCatalogId,
  }
}

export function updateGroupCatalog(groupCatalogId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingGroupCatalog(groupCatalogId))
    authRequest
      .putEntity(`${SOL_BASE_URL}${GROUP_CATALOGS_API_PATH}/${groupCatalogId}`, params)
      .then(res => dispatch(updateGroupCatalogSuccess(res.data)))
      .catch(error => dispatch(updateGroupCatalogFailure(error, groupCatalogId)))
  }
}