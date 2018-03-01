import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PROVIDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingProvider() {
  return {
    type: actionTypes.SET_IS_FETCHING_PROVIDER,
  }
}

function fetchProviderSuccess(record) {
  return {
    type: actionTypes.FETCH_PROVIDER_SUCCESS,
    record,
  }
}

function fetchProviderFailure(error) {
  return {
    type: actionTypes.FETCH_PROVIDER_FAILURE,
    error,
  }
}

export function fetchProvider(providerId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingProvider())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${PROVIDERS_API_PATH}/${providerId}`, params)
      .then(res => dispatch(fetchProviderSuccess(res.data)))
      .catch(error => dispatch(fetchProviderFailure(error)))
  }
}

function setIsUpdatingProvider(providerId) {
  return {
    type: actionTypes.SET_IS_UPDATING_PROVIDER,
    providerId,
  }
}

function updateProviderSuccess(record) {
  return {
    type: actionTypes.UPDATE_PROVIDER_SUCCESS,
    record,
  }
}

function updateProviderFailure(error, providerId) {
  return {
    type: actionTypes.UPDATE_PROVIDER_FAILURE,
    error,
    providerId,
  }
}

export function updateProvider(providerId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingProvider(providerId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${PROVIDERS_API_PATH}/${providerId}`, params)
      .then(res => dispatch(updateProviderSuccess(res.data)))
      .catch(error => dispatch(updateProviderFailure(error, providerId)))
  }
}