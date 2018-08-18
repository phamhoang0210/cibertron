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
  console.log('error',error)
  return {
    type: actionTypes.FETCH_CAMPAIGN_FAILURE,
    error,
  }
}

export function fetchCampaign(campaignId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingCampaign())
    console.log('actionTypes',setIsFetchingCampaign())
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
  console.log('error',error)
  console.log('campaignId',campaignId)
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