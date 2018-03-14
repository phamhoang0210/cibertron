import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {IPPHONES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingIpphones() {
  return {
    type: actionTypes.SET_IS_FETCHING_IPPHONES,
  }
}

function fetchIpphonesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_IPPHONES_SUCCESS,
    records,
    filters,
  }
}

function fetchIpphonesFailure(error) {
  return {
    type: actionTypes.FETCH_IPPHONES_FAILURE,
    error,
  }
}

export function fetchIpphones(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingIpphones())
    authRequest
      .fetchEntities(`${NAUH_BASE_URL}${IPPHONES_API_PATH}`, params)
      .then(res => dispatch(fetchIpphonesSuccess(res.data)))
      .catch(error => dispatch(fetchIpphonesFailure(error)))
  }
}

function setIsDeletingIpphone(ipphoneId) {
  return {
    type: actionTypes.SET_IS_DELETING_IPPHONE,
    ipphoneId,
  }
}

function deleteIpphoneSuccess(record) {
  return {
    type: actionTypes.DELETE_IPPHONE_SUCCESS,
    record,
  }
}

function deleteIpphoneFailure(error, ipphoneId) {
  return {
    type: actionTypes.DELETE_IPPHONE_FAILURE,
    error,
    ipphoneId,
  }
}

export function deleteIpphone(ipphoneId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingIpphone(ipphoneId))
    authRequest
      .deleteEntity(`${NAUH_BASE_URL}${IPPHONES_API_PATH}/${ipphoneId}`)
      .then(res => {
        dispatch(deleteIpphoneSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('ipphoneFilters'))
        dispatch(fetchIpphones(filterParams))
      })
      .catch(error => dispatch(deleteIpphoneFailure(error, ipphoneId)))
  }
}