import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {MEEPO_BASE_URL, SENDERS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingSender() {
  return {
    type: actionTypes.SET_IS_CREATING_SENDER,
  }
}

function createSenderSucces(record) {
  return {
    type: actionTypes.CREATE_SENDER_SUCCESS,
    record
  }
}

function createSenderFailure(error) {
  return {
    type: actionTypes.CREATE_SENDER_FAILURE,
    error,
  }
}

export function createSender(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingSender())

    return authRequest
      .submitEntity(`${MEEPO_BASE_URL}${SENDERS_API_PATH}`, params)
      .then(res => dispatch(createSenderSucces(res.data)))
      .catch(error => dispatch(createSenderFailure(error)))
  }
}

export function resetAlert() {
  return dispatch => {
    dispatch({type: ''})
  }
}