import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PROVIDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingProvider(providerId) {
  return {
    type: actionTypes.SET_IS_DELETING_PROVIDER,
    providerId,
  }
}

function deleteProviderSuccess(record) {
  return {
    type: actionTypes.DELETE_PROVIDER_SUCCESS,
    record,
  }
}

function deleteProviderFailure(error, providerId) {
  return {
    type: actionTypes.DELETE_PROVIDER_FAILURE,
    error,
    providerId,
  }
}

export function deleteProvider(providerId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingProvider(providerId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${PROVIDERS_API_PATH}/${providerId}`)
      .then(res => {
        dispatch(deleteProviderSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('providerFilters'))
        dispatch(fetchProviders(filterParams))
      })
      .catch(error => dispatch(deleteProviderFailure(error, providerId)))
  }
}