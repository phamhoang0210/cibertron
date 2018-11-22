import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  GROUP_CATALOGS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingGroupCatalogs() {
  return {
    type: actionTypes.SET_IS_FETCHING_GROUP_CATALOGS,
  }
}

function fetchGroupCatalogsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_GROUP_CATALOGS_SUCCESS,
    records,
    filters,
  }
}

function fetchGroupCatalogsFailure(error) {
  return {
    type: actionTypes.FETCH_GROUP_CATALOGS_FAILURE,
    error,
  }
}

export function fetchGroupCatalogs(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingGroupCatalogs())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${GROUP_CATALOGS_API_PATH}`, params)
      .then(res => dispatch(fetchGroupCatalogsSuccess(res.data)))
      .catch(error => dispatch(fetchGroupCatalogsFailure(error)))
  }
}

function setIsDeletingGroupCatalog(groupCatalogId) {
  return {
    type: actionTypes.SET_IS_DELETING_GROUP_CATALOG,
    groupCatalogId,
  }
}

function deleteGroupCatalogSuccess(record) {
  return {
    type: actionTypes.DELETE_GROUP_CATALOG_SUCCESS,
    record,
  }
}

function deleteGroupCatalogFailure(error, groupCatalogId) {
  return {
    type: actionTypes.DELETE_GROUP_CATALOG_FAILURE,
    error,
    groupCatalogId,
  }
}

export function deleteGroupCatalog(groupCatalogId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingGroupCatalog(groupCatalogId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${GROUP_CATALOGS_API_PATH}/${groupCatalogId}`)
      .then(res => {
        dispatch(deleteGroupCatalogSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('groupCatalogFilters'))
        dispatch(fetchGroupCatalogs(filterParams))
      })
      .catch(error => dispatch(deleteGroupCatalogFailure(error, groupCatalogId)))
  }
}