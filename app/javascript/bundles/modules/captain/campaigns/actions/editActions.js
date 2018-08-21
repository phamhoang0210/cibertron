import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CAMPAIGNS_API_PATH} from '../constants/paths'
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
      .fetchEntities(`${CAPTAIN_BASE_URL}${CAMPAIGNS_API_PATH}/detail/${campaignId}`, params)
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
      .putEntity(`${CAPTAIN_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`, params)
      .then(res => dispatch(updateCampaignSuccess(res.data)))
      .catch(error => dispatch(updateCampaignFailure(error, campaignId)))
  }
}

export function updateViewDealCourse(viewType) {
  return {
    type: actionTypes.UPDATE_VIEW_DEAL_COURSE,
    viewType,
  }
}

export function addCoursesData(course) {
  return {
    type: actionTypes.ADD_COURSES_DATA,
    course,
  }
}

export function deleteCourseData(course) {
  return {
    type: actionTypes.DELETE_COURSE_DATA,
    course,
  }
}

function setIsUpdatingCoursesInCampaign(campaignId) {
  return {
    type: actionTypes.SET_IS_UPDATING_COURSES_IN_CAMPAIGN,
    campaignId,
  }
}

function updateCoursesInCampaignSuccess(record) {
  return {
    type: actionTypes.UPDATE_COURSES_IN_CAMPAIGN_SUCCESS,
    record,
  }
}

function updateCoursesInCampaignFailure(error, campaignId) {
  return {
    type: actionTypes.UPDATE_COURSES_IN_CAMPAIGN_FAILURE,
    error,
    campaignId,
  }
}

export function updateCoursesInCampaign(campaignId, params = {}) {
  return dispatch => {
    dispatch(setIsUpdatingCoursesInCampaign(campaignId))
    authRequest
      .putEntity(`${CAPTAIN_BASE_URL}${CAMPAIGNS_API_PATH}/${campaignId}`, params)
      .then(res => dispatch(updateCoursesInCampaignSuccess(res.data)))
      .catch(error => dispatch(updateCoursesInCampaignFailure(error, campaignId)))
  }
}

export function updatePromotionPercent(data) {
  return {
    type: actionTypes.UPDATE_PROMOTION_PERCENT,
    data,
  }
}