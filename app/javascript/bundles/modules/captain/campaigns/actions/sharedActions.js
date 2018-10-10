import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
USERS_API_PATH, ALL_CAMPAIGNS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'

function setIsFetchingAllCampaigns() {
  return {
    type: actionTypes.SET_IS_FETCHING_ALL_CAMPAIGNS,
  }
}

function fetchAllCampaignsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ALL_CAMPAIGNS_SUCCESS,
    records,
    filters,
  }
}

function fetchAllCampaignsFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_CAMPAIGNS_FAILURE,
    error,
  }
}

export function fetchAllCampaigns(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAllCampaigns())
    authRequest
      .fetchEntities(`${CAPTAIN_BASE_URL}${ALL_CAMPAIGNS_API_PATH}`,params)
      .then(res => dispatch(fetchAllCampaignsSuccess(res.data)))
      .catch(error => dispatch(fetchAllCampaignsFailure(error)))
  }
}
//set all users
function setIsFetchingAllUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_ALL_USERS,
  }
}

function fetchAllUsersSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    records,
    filters,
  }
}

function fetchAllUsersFailure(error) {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILURE,
    error,
  }
}

export function fetchAllUsers(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingAllUsers())
    authRequest
      .fetchEntities(`${CAPTAIN_BASE_URL}${USERS_API_PATH}`,params)
      .then(res => dispatch(fetchAllUsersSuccess(res.data)))
      .catch(error => dispatch(fetchAllUsersFailure(error)))
  }
}