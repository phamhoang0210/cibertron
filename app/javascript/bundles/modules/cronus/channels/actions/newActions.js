import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CHANNELS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingChannel() {
  return {
    type: actionTypes.SET_IS_CREATING_CHANNEL,
  }
}

function createChannelSucces(record) {
  return {
    type: actionTypes.CREATE_CHANNEL_SUCCESS,
    record
  }
}

function createChannelFailure(error) {
  return {
    type: actionTypes.CREATE_CHANNEL_FAILURE,
    error,
  }
}

export function createChannel(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingChannel())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}`, params)
      .then(res => dispatch(createChannelSucces(res.data)))
      .catch(error => dispatch(createChannelFailure(error)))
  }
}