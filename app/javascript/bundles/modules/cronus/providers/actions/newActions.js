import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {PROVIDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingProvider() {
  return {
    type: actionTypes.SET_IS_CREATING_PROVIDER,
  }
}

function createProviderSuccess(record) {
  return {
    type: actionTypes.CREATE_PROVIDER_SUCCESS,
    record
  }
}

function createProviderFailure(error) {
  return {
    type: actionTypes.CREATE_PROVIDER_FAILURE,
    error,
  }
}

export function createProvider(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingProvider())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${PROVIDERS_API_PATH}`, params)
      .then(res => dispatch(createProviderSuccess(res.data)))
      .catch(error => dispatch(createProviderFailure(error)))
  }
}