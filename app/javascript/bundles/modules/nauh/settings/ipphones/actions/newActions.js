import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {IPPHONES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingIpphone() {
  return {
    type: actionTypes.SET_IS_CREATING_IPPHONE,
  }
}

function createIpphoneSucces(record) {
  return {
    type: actionTypes.CREATE_IPPHONE_SUCCESS,
    record
  }
}

function createIpphoneFailure(error) {
  return {
    type: actionTypes.CREATE_IPPHONE_FAILURE,
    error,
  }
}

export function createIpphone(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingIpphone())

    return authRequest
      .submitEntity(`${NAUH_BASE_URL}${IPPHONES_API_PATH}`, params)
      .then(res => dispatch(createIpphoneSucces(res.data)))
      .catch(error => dispatch(createIpphoneFailure(error)))
  }
}