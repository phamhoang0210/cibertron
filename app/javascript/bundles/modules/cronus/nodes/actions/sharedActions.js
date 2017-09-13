import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  CRONUS_BASE_URL, CHANNELS_API_PATH, CATEGORIES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

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