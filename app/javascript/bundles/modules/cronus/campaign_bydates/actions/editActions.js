import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CAMPAIGN_BYDATESS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCampaignBydate() {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATES,
  }
}

function fetchCampaignBydateSuccess(record) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATES_SUCCESS,
    record,
  }
}

function fetchCampaignBydateFailure(error) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATES_FAILURE,
    error,
  }
}

export function fetchCampaignBydate(campaignBydateId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaignBydate())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATESS_API_PATH}/${campaignBydateId}`, params)
      .then(res => dispatch(fetchCampaignBydateSuccess(res.data)))
      .catch(error => dispatch(fetchCampaignBydateFailure(error)))
  }
}

function setIsUpdatingCampaignBydate(campaignBydateId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CAMPAIGN_BYDATES,
    campaignBydateId,
  }
}

function updateCampaignBydateSuccess(record) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_BYDATES_SUCCESS,
    record,
  }
}

function updateCampaignBydateFailure(error, campaignBydateId) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_BYDATES_FAILURE,
    error,
    campaignBydateId,
  }
}

export function updateCampaignBydate(campaignBydateId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCampaignBydate(campaignBydateId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATESS_API_PATH}/${campaignBydateId}`, params)
      .then(res => dispatch(updateCampaignBydateSuccess(res.data)))
      .catch(error => dispatch(updateCampaignBydateFailure(error, campaignBydateId)))
  }
}