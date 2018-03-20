import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CHANNELS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingChannels() {
  return {
    type: actionTypes.SET_IS_FETCHING_CHANNELS,
  }
}

function fetchChannelsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CHANNELS_SUCCESS,
    records,
    filters,
  }
}

function fetchChannelsFailure(error) {
  return {
    type: actionTypes.FETCH_CHANNELS_FAILURE,
    error,
  }
}

export function fetchChannels(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingChannels())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}`, params)
      .then(res => dispatch(fetchChannelsSuccess(res.data)))
      .catch(error => dispatch(fetchChannelsFailure(error)))
  }
}

function setIsDeletingChannel(channelId) {
  return {
    type: actionTypes.SET_IS_DELETING_CHANNEL,
    channelId,
  }
}

function deleteChannelSuccess(record) {
  return {
    type: actionTypes.DELETE_CHANNEL_SUCCESS,
    record,
  }
}

function deleteChannelFailure(error, channelId) {
  return {
    type: actionTypes.DELETE_CHANNEL_FAILURE,
    error,
    channelId,
  }
}

export function deleteChannel(channelId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingChannel(channelId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${CHANNELS_API_PATH}/${channelId}`)
      .then(res => {
        dispatch(deleteChannelSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('channelFilters'))
        dispatch(fetchChannels(filterParams))
      })
      .catch(error => dispatch(deleteChannelFailure(error, channelId)))
  }
}