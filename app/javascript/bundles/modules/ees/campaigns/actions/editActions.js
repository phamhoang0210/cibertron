import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  FURION_INTERNAL_BASE_URL, CAMPAIGNS_API_PATH, SEND_CAMPAIGN_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCampaign() {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGN,
  }
}

function fetchCampaignSuccess(record) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_SUCCESS,
    record,
  }
}

function fetchCampaignFailure(error) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_FAILURE,
    error,
  }
}

export function fetchCampaign(campaignId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaign())
    authRequest
      .fetchEntities(`${FURION_INTERNAL_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`, params)
      .then(res => dispatch(fetchCampaignSuccess(res.data)))
      .catch(error => dispatch(fetchCampaignFailure(error)))
  }
}

function setIsUpdatingCampaign(campaignId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CAMPAIGN,
    campaignId,
  }
}

function updateCampaignSuccess(record) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_SUCCESS,
    record,
  }
}

function updateCampaignFailure(error, campaignId) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_FAILURE,
    error,
    campaignId,
  }
}

export function updateCampaign(campaignId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCampaign(campaignId))
    authRequest
      .putEntity(`${FURION_INTERNAL_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`, params)
      .then(res => dispatch(updateCampaignSuccess(res.data)))
      .catch(error => dispatch(updateCampaignFailure(error, campaignId)))
  }
}

// Send Campaign
function setIsSendingCampaign() {
  return {
    type: actionTypes.SET_IS_SENDING_CAMPAIGN,
  }
}

function sendCampaignSuccess(record) {
  return {
    type: actionTypes.SEND_CAMPAIGN_SUCCESS,
    record,
  }
}

function sendCampaignFailure(error) {
  return {
    type: actionTypes.SEND_CAMPAIGN_FAILURE,
    error,
  }
}

export function sendCampaign(campaignId, params = {}) {
  return dispatch => {
    dispatch(setIsSendingCampaign())
    authRequest
      .submitEntity(`${FURION_INTERNAL_BASE_URL}${SEND_CAMPAIGN_API_PATH}`, params)
      .then(res => {
        dispatch(sendCampaignSuccess(res.data))
        dispatch(fetchCampaign(campaignId))
      })
      .catch(error => dispatch(sendCampaignFailure(error)))
  }
}


