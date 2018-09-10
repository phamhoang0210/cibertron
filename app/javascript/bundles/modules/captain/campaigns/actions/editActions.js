import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {CAMPAIGNS_API_PATH, COURSES_API_PATH, CATALOGS_API_PATH, INSTRUCTORS_API_PATH} from '../constants/paths'
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

function setIsLoadingCategories() {
  return {
    type: actionTypes.SET_IS_LOADING_CATEGORIES
  }
}

function loadCategoriesSuccess(categories) {
  return {
    type: actionTypes.LOAD_CATEGORIES_SUCCESS,
    categories
  }
}

function loadCategoriesFailure(error) {
  return {
    type: actionTypes.LOAD_CATEGORIES_FAILURE,
    error
  }
}

export function loadCategories() {
  return dispatch => {
    dispatch(setIsLoadingCategories())
    authRequest
      .fetchEntities(`${TYCOON_BASE_URL}${CATALOGS_API_PATH}?per_page=2000`)
      .then(res => dispatch(loadCategoriesSuccess(res.data)))
      .catch(error => dispatch(loadCategoriesFailure(error)))
  }
}

function setIsLoadingCoursesByCategory() {
  return {
    type: actionTypes.SET_IS_LOADING_COURSES_BY_CATEGORY
  }
}

function loadCoursesByCategorySuccess(categories) {
  return {
    type: actionTypes.LOAD_COURSES_BY_CATEGORY_SUCCESS,
    categories
  }
}

function loadCoursesByCategoryFailure(error) {
  return {
    type: actionTypes.LOAD_COURSES_BY_CATEGORY_FAILURE,
    error
  }
}

export function loadCoursesByCategory(id) {
  return dispatch => {
    dispatch(setIsLoadingCoursesByCategory())
    authRequest
      .fetchEntities(`${CAPTAIN_BASE_URL}${COURSES_API_PATH}?compconds[category_ids]=${id}`)
      .then(res => dispatch(loadCoursesByCategorySuccess(res.data)))
      .catch(error => dispatch(loadCoursesByCategoryFailure(error)))
  }
}

function setIsFetchingCourseByCondition() {
  return {
    type: actionTypes.IS_FETCHING_COURSE_BY_CONDITION
  }
}

function fetchCoursesByConditionSuccess(courses) {
  return {
    type: actionTypes.FETCHING_COURSES_BY_CONDITION_SUCCESS,
    courses
  }
}

function fetchCoursesByConditionFailure(error) {
  return {
    type: actionTypes.FETCHING_COURSES_BY_CONDITION_FAILURE,
    error
  }
}

export function fetchCourseByCondition(val, target) {
  if (target == 'price') {
    var api = `${CAPTAIN_BASE_URL}${COURSES_API_PATH}?compconds[price]=${val}`
  } else if (target == 'course_code') {
    var api = `${CAPTAIN_BASE_URL}${COURSES_API_PATH}?compconds[code]=${val}`
  } else if (target == 'teacher') {
    var api = `${CAPTAIN_BASE_URL}${COURSES_API_PATH}?compconds[instructor_code]=${val}`
  }

  return dispatch => {
    dispatch(setIsFetchingCourseByCondition())
    authRequest
      .fetchEntities(api)
      .then(res => dispatch(fetchCoursesByConditionSuccess(res.data)))
      .catch(error => dispatch(fetchCoursesByConditionFailure(error)))
  }
}

// function setIsLoadingCoursesByTeacher() {
//   return {
//     type: actionTypes.SET_IS_LOADING_COURSES_BY_TEACHER
//   }
// }

// function loadCoursesByTeacherSuccess(teachers) {
//   return {
//     type: actionTypes.LOAD_COURSES_BY_TEACHER_SUCCESS,
//     teachers
//   }
// }

// function loadCoursesByTeacherFailure(error) {
//   return {
//     type: actionTypes.LOAD_COURSES_BY_TEACHER_FAILURE,
//     error
//   }
// }

// export function loadCoursesByTeacher() {
//   return dispatch => {
//     dispatch(setIsLoadingCoursesByTeacher())
//     authRequest
//       .fetchEntities(`${TYCOON_BASE_URL}${ALL_COURSES_BY_TEACHER_PATH}`)
//       .then(res => dispatch(loadCoursesByTeacherSuccess(res.data)))
//       .catch(error => dispatch(loadCoursesByTeacherFailure(error)))
//   }
// }

