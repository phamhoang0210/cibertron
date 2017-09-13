import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CRONUS_BASE_URL, PROVIDERS_API_PATH, CATEGORIES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingProviders() {
  return {
    type: actionTypes.SET_IS_FETCHING_PROVIDERS,
  }
}

function fetchProvidersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_PROVIDERS_SUCCESS,
    records,
    filters,
  }
}

function fetchProvidersFailure(error) {
  return {
    type: actionTypes.FETCH_PROVIDERS_FAILURE,
    error,
  }
}

export function fetchProviders(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingProviders())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${PROVIDERS_API_PATH}`, params)
      .then(res => dispatch(fetchProvidersSuccess(res.data)))
      .catch(error => dispatch(fetchProvidersFailure(error)))
  }
}

function setIsFetchingCategories() {
  return {
    type: actionTypes.SET_IS_FETCHING_CATEGORIES,
  }
}

function fetchCategoriesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    records,
    filters,
  }
}

function fetchCategoriesFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE,
    error,
  }
}

export function fetchCategories(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCategories())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CATEGORIES_API_PATH}`, params)
      .then(res => dispatch(fetchCategoriesSuccess(res.data)))
      .catch(error => dispatch(fetchCategoriesFailure(error)))
  }
}