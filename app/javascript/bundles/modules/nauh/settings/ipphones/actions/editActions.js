import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {NAUH_BASE_URL, IPPHONES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingIpphone() {
  return {
    type: actionTypes.SET_IS_FETCHING_IPPHONE,
  }
}

function fetchIpphoneSuccess(record) {
  return {
    type: actionTypes.FETCH_IPPHONE_SUCCESS,
    record,
  }
}

function fetchIpphoneFailure(error) {
  return {
    type: actionTypes.FETCH_IPPHONE_FAILURE,
    error,
  }
}

export function fetchIpphone(ipphoneId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingIpphone())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${IPPHONES_API_PATH}/${ipphoneId}`, params)
      .then(res => dispatch(fetchIpphoneSuccess(res.data)))
      .catch(error => dispatch(fetchIpphoneFailure(error)))
  }
}

function setIsUpdatingIpphone(ipphoneId) {
  return {
    type: actionTypes.SET_IS_UPDATING_IPPHONE,
    ipphoneId,
  }
}

function updateIpphoneSuccess(record) {
  return {
    type: actionTypes.UPDATE_IPPHONE_SUCCESS,
    record,
  }
}

function updateIpphoneFailure(error, ipphoneId) {
  return {
    type: actionTypes.UPDATE_IPPHONE_FAILURE,
    error,
    ipphoneId,
  }
}

export function updateIpphone(ipphoneId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingIpphone(ipphoneId))
    authRequest
      .putEntity(`${NAUH_BASE_URL}${IPPHONES_API_PATH}/${ipphoneId}`, params)
      .then(res => dispatch(updateIpphoneSuccess(res.data)))
      .catch(error => dispatch(updateIpphoneFailure(error, ipphoneId)))
  }
}