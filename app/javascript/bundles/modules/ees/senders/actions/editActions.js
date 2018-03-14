import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  SENDERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingSender() {
  return {
    type: actionTypes.SET_IS_FETCHING_SENDER,
  }
}

function fetchSenderSuccess(record) {
  return {
    type: actionTypes.FETCH_SENDER_SUCCESS,
    record,
  }
}

function fetchSenderFailure(error) {
  return {
    type: actionTypes.FETCH_SENDER_FAILURE,
    error,
  }
}

export function fetchSender(senderId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingSender())
    authRequest
      .fetchEntities(`${MEEPO_BASE_URL}${SENDERS_API_PATH}/${senderId}`, params)
      .then(res => dispatch(fetchSenderSuccess(res.data)))
      .catch(error => dispatch(fetchSenderFailure(error)))
  }
}

function setIsUpdatingSender(senderId) {
  return {
    type: actionTypes.SET_IS_UPDATING_SENDER,
    senderId,
  }
}

function updateSenderSuccess(record) {
  return {
    type: actionTypes.UPDATE_SENDER_SUCCESS,
    record,
  }
}

function updateSenderFailure(error, senderId) {
  return {
    type: actionTypes.UPDATE_SENDER_FAILURE,
    error,
    senderId,
  }
}

export function updateSender(senderId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingSender(senderId))
    authRequest
      .putEntity(`${MEEPO_BASE_URL}${SENDERS_API_PATH}/${senderId}`, params)
      .then(res => dispatch(updateSenderSuccess(res.data)))
      .catch(error => dispatch(updateSenderFailure(error, senderId)))
  }
}

