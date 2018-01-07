import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  FURION_BASE_URL, CAMPAIGNS_API_PATH, 
  USERSERVICE_BASE_URL , USERS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCampaigns() {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGNS,
  }
}

function fetchCampaignsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CAMPAIGNS_SUCCESS,
    records,
    filters,
  }
}

function fetchCampaignsFailure(error) {
  return {
    type: actionTypes.FETCH_CAMPAIGNS_FAILURE,
    error,
  }
}

export function fetchCampaigns(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaigns())

    authRequest
      .fetchEntities(`${FURION_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
      //.then(res => {dispatch(fetchUsers(res.data))})
      .then(res => dispatch(fetchCampaignsSuccess(res.data)))
      .catch(error => dispatch(fetchCampaignsFailure(error)))
    }
}

function setIsDeletingCampaign(campaignId) {
  return {
    type: actionTypes.SET_IS_DELETING_CAMPAIGN,
    campaignId,
  }
}

function deleteCampaignSuccess(record) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_SUCCESS,
    record,
  }
}

function deleteCampaignFailure(error, campaignId) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_FAILURE,
    error,
    campaignId,
  }
}

export function deleteCampaign(campaignId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCampaign(campaignId))
    authRequest
      .deleteEntity(`${FURION_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`)
      .then(res => {
        dispatch(deleteCampaignSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('campaignFilters'))
        dispatch(fetchCampaigns(filterParams))
      })
      .catch(error => dispatch(deleteCampaignFailure(error, campaignId)))
  }
}

// Fetch users
function setIsFetchingUsers() {
  return {
    type: actionTypes.SET_IS_FETCHING_USERS,
  }
}

function fetchUsersSuccess() {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
  }
}

function fetchUsersFailure(error) {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  }
}

export function fetchUsers(data) {
  return dispatch => {
    dispatch(setIsFetchingUsers())
    var list_user_id = []
    
    if(data.records){
      data.records.map(record => {
        list_user_id.push(record.user_id)
      })
    }
    authRequest
      .fetchEntities(`${USERSERVICE_BASE_URL}${USERS_API_PATH}`, {'compconds': {'id.in':list_user_id}})
      .then(res => {
        dispatch(setIsFetchingUsers())
        var users = res.data.records
        const users_array = {}

        if(users) {
          users.map(user => {
            users_array[user.id] = user.username
          })
        }
        if(data.records && users_array){
          data.records.map(campaign => {
            campaign["username"] = users_array[campaign.user_id]
          })
        }
        dispatch(fetchCampaignsSuccess(data))
        dispatch(fetchUsersSuccess())
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  }
}