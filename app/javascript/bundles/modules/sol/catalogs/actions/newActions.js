import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CATALOGS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingCatalog() {
  return {
    type: actionTypes.SET_IS_CREATING_CATALOG,
  }
}

function createCatalogSucces(record) {
  return {
    type: actionTypes.CREATE_CATALOG_SUCCESS,
    record
  }
}

function createCatalogFailure(error) {
  return {
    type: actionTypes.CREATE_CATALOG_FAILURE,
    error,
  }
}

export function createCatalog(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCatalog())

    return authRequest
      .submitEntity(`${SOL_BASE_URL}${CATALOGS_API_PATH}`, params)
      .then(res => dispatch(createCatalogSucces(res.data)))
      .catch(error => dispatch(createCatalogFailure(error)))
  }
}