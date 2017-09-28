import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CAMPAIGNS_API_PATH} from '../constants/paths'
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
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGNS_API_PATH}`, params)
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
      .deleteEntity(`${CRONUS_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`)
      .then(res => {
        dispatch(deleteCampaignSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('campaignFilters'))
        dispatch(fetchCampaigns(filterParams))
      })
      .catch(error => dispatch(deleteCampaignFailure(error, campaignId)))
  }
}