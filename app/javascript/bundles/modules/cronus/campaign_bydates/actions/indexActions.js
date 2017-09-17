import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CRONUS_BASE_URL, CAMPAIGN_BYDATESS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCampaignBydates() {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATESS,
  }
}

function fetchCampaignBydatesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATESS_SUCCESS,
    records,
    filters,
  }
}

function fetchCampaignBydatesFailure(error) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATESS_FAILURE,
    error,
  }
}

export function fetchCampaignBydates(params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaignBydates())
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATESS_API_PATH}`, params)
      .then(res => dispatch(fetchCampaignBydatesSuccess(res.data)))
      .catch(error => dispatch(fetchCampaignBydatesFailure(error)))
  }
}

function setIsDeletingCampaignBydate(campaignBydateId) {
  return {
    type: actionTypes.SET_IS_DELETING_CAMPAIGN_BYDATES,
    campaignBydateId,
  }
}

function deleteCampaignBydateSuccess(record) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_BYDATES_SUCCESS,
    record,
  }
}

function deleteCampaignBydateFailure(error, campaignBydateId) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_BYDATES_FAILURE,
    error,
  }
}

export function deleteCampaignBydate(campaignBydateId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCampaignBydate(campaignBydateId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATESS_API_PATH}/${campaignBydateId}`)
      .then(res => {
        dispatch(deleteCampaignBydateSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('campaignBydateFilters'))
        dispatch(fetchCampaignBydates(filterParams))
      })
      .catch(error => dispatch(deleteCampaignBydateFailure(error, campaignBydateId)))
  }
}