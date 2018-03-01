import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CAMPAIGN_BYDATES_API_PATH, CAMPAIGNS_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingCampaignBydates(campaign) {
  return {
    type: actionTypes.SET_IS_FETCHING_CAMPAIGN_BYDATES,
    campaign,
  }
}

function fetchCampaignBydatesSuccess({records, filters}, campaign) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATES_SUCCESS,
    records,
    filters,
    campaign,
  }
}

function fetchCampaignBydatesFailure(error, campaign) {
  return {
    type: actionTypes.FETCH_CAMPAIGN_BYDATES_FAILURE,
    error,
    campaign,
  }
}

export function fetchCampaignBydates(campaign, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaignBydates(campaign))
    authRequest
      .fetchEntities(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATES_API_PATH}`, params)
      .then(res => dispatch(fetchCampaignBydatesSuccess(res.data, campaign)))
      .catch(error => dispatch(fetchCampaignBydatesFailure(error, campaign)))
  }
}

function setIsDeletingCampaignBydate(campaign, campaignBydateId) {
  return {
    type: actionTypes.SET_IS_DELETING_CAMPAIGN_BYDATES,
    campaignBydateId,
    campaign,
  }
}

function deleteCampaignBydateSuccess(campaign, record) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_BYDATES_SUCCESS,
    record,
    campaign,
  }
}

function deleteCampaignBydateFailure(campaign, campaignBydateId, error) {
  return {
    type: actionTypes.DELETE_CAMPAIGN_BYDATES_FAILURE,
    error,
    campaign,
    campaignBydateId,
  }
}

export function deleteCampaignBydate(campaign, campaignBydateId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCampaignBydate(campaign, campaignBydateId))
    authRequest
      .deleteEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATES_API_PATH}/${campaignBydateId}`)
      .then(res => {
        const filterParams = getFilterParams(campaign.get('campaignBydateFilters'))
        dispatch(fetchCampaignBydates(campaign, filterParams))
      })
      .catch(error => dispatch(deleteCampaignBydateFailure(campaign, campaignBydateId, error)))
  }
}


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

function setIsUpdatingCampaignBydate(campaign, campaignBydateId) {
  return {
    type: actionTypes.SET_IS_UPDATING_CAMPAIGN_BYDATE,
    campaignBydateId,
    campaign,
  }
}

function updateCampaignBydateSuccess(campaign, campaignBydateId, record) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_BYDATE_SUCCESS,
    record,
    campaign,
    campaignBydateId,
  }
}

function updateCampaignBydateFailure(campaign, campaignBydateId, error) {
  return {
    type: actionTypes.UPDATE_CAMPAIGN_BYDATE_FAILURE,
    error,
    campaignBydateId,
    campaign,
  }
}

export function updateCampaignBydate(campaign, campaignBydateId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCampaignBydate(campaign, campaignBydateId))
    authRequest
      .putEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATES_API_PATH}/${campaignBydateId}`, params)
      .then(res => dispatch(updateCampaignBydateSuccess(campaign, campaignBydateId, res.data)))
      .catch(error => dispatch(updateCampaignBydateFailure(campaign, campaignBydateId, error)))
  }
}


function setIsCreatingCampaignBydate() {
  return {
    type: actionTypes.SET_IS_CREATING_CAMPAIGN_BYDATE,
  }
}

function createCampaignBydateSucces(record) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_BYDATE_SUCCESS,
    record
  }
}

function createCampaignBydateFailure(error) {
  return {
    type: actionTypes.CREATE_CAMPAIGN_BYDATE_FAILURE,
    error,
  }
}

export function createCampaignBydate(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingCampaignBydate())

    return authRequest
      .submitEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATES_API_PATH}`, params)
      .then(res => dispatch(createCampaignBydateSucces(res.data)))
      .catch(error => dispatch(createCampaignBydateFailure(error)))
  }
}

function setIsImportCampaignBydates() {
  return {
    type: actionTypes.SET_IS_IMPORTING_CAMPAIGN_BYDATES,
  }
}

function importCampaignBydatesSucces(importResult) {
  return {
    type: actionTypes.IMPORT_CAMPAIGN_BYDATES_SUCCESS,
    importResult,
  }
}

function importCampaignBydatesFailure(error) {
  return {
    type: actionTypes.IMPORT_CAMPAIGN_BYDATES_FAILURE,
    error,
  }
}

export function importCampaignBydates(params = {}) {
  return dispatch => {
    dispatch(setIsImportCampaignBydates())

    return authRequest
      .uploadEntity(`${CRONUS_BASE_URL}${CAMPAIGN_BYDATES_API_PATH}/import`, params)
      .then(res => dispatch(importCampaignBydatesSucces(res.data)))
      .catch(error => dispatch(importCampaignBydatesFailure(error)))
  }
}