import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CATALOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCatalog() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATALOG,
  }
}

function fetchCatalogSuccess(record) {
  return {
    type: actionTypes.FETCH_CATALOG_SUCCESS,
    record,
  }
}

function fetchCatalogFailure(error) {
  return {
    type: actionTypes.FETCH_CATALOG_FAILURE,
    error,
  }
}

export function fetchCatalog(catalogId, params) {
  return dispatch => {
    dispatch(setIsFetchingCatalog())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${CATALOGS_API_PATH}/${catalogId}`, params)
      .then(res => dispatch(fetchCatalogSuccess(res.data)))
      .catch(error => dispatch(fetchCatalogFailure(error)))
  }
}

function setIsUpdatingCatalog(catalogId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CATALOG,
    catalogId,
  }
}

function updateCatalogSuccess(record) {
  return {
    type: actionTypes.UPDATE_CATALOG_SUCCESS,
    record,
  }
}

function updateCatalogFailure(error, catalogId) {
  return {
    type: actionTypes.UPDATE_CATALOG_FAILURE,
    error,
    catalogId,
  }
}

export function updateCatalog(catalogId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCatalog(catalogId))
    authRequest
      .putEntity(`${SOL_BASE_URL}${CATALOGS_API_PATH}/${catalogId}`, params)
      .then(res => dispatch(updateCatalogSuccess(res.data)))
      .catch(error => dispatch(updateCatalogFailure(error, catalogId)))
  }
}