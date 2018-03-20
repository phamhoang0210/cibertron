import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CHANNELS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingChannel() {
  return {
    type: actionTypes.SET_IS_FETCHING_CHANNEL,
  }
}

function fetchChannelSuccess(record) {
  return {
    type: actionTypes.FETCH_CHANNEL_SUCCESS,
    record,
  }
}

function fetchChannelFailure(error) {
  return {
    type: actionTypes.FETCH_CHANNEL_FAILURE,
    error,
  }
}

export function fetchChannel(channelId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingChannel())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}/${channelId}`, params)
      .then(res => dispatch(fetchChannelSuccess(res.data)))
      .catch(error => dispatch(fetchChannelFailure(error)))
  }
}

function setIsUpdatingChannel(channelId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CHANNEL,
    channelId,
  }
}

function updateChannelSuccess(record) {
  return {
    type: actionTypes.UPDATE_CHANNEL_SUCCESS,
    record,
  }
}

function updateChannelFailure(error, channelId) {
  return {
    type: actionTypes.UPDATE_CHANNEL_FAILURE,
    error,
    channelId,
  }
}

export function updateChannel(channelId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingChannel(channelId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}/${channelId}`, params)
      .then(res => dispatch(updateChannelSuccess(res.data)))
      .catch(error => dispatch(updateChannelFailure(error, channelId)))
  }
}