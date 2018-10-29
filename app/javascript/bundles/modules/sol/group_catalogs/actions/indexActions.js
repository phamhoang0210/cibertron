import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CATALOGS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCatalogs() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATALOGS,
  }
}

function fetchCatalogsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CATALOGS_SUCCESS,
    records,
    filters,
  }
}

function fetchCatalogsFailure(error) {
  cosole.log()
  return {
    type: actionTypes.FETCH_CATALOGS_FAILURE,
    error,
  }
}

export function fetchCatalogs(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCatalogs())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${CATALOGS_API_PATH}`, params)
      .then(res => dispatch(fetchCatalogsSuccess(res.data)))
      .catch(error => dispatch(fetchCatalogsFailure(error)))
  }
}

function setIsDeletingCatalog(catalogId) {
  return {
    type: actionTypes.SET_IS_DELETING_CATALOG,
    catalogId,
  }
}

function deleteCatalogSuccess(record) {
  return {
    type: actionTypes.DELETE_CATALOG_SUCCESS,
    record,
  }
}

function deleteCatalogFailure(error, catalogId) {
  return {
    type: actionTypes.DELETE_CATALOG_FAILURE,
    error,
    catalogId,
  }
}

export function deleteCatalog(catalogId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCatalog(catalogId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${CATALOGS_API_PATH}/${catalogId}`)
      .then(res => {
        dispatch(deleteCatalogSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('catalogFilters'))
        dispatch(fetchCatalogs(filterParams))
      })
      .catch(error => dispatch(deleteCatalogFailure(error, catalogId)))
  }
}