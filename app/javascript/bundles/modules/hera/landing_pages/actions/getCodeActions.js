import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {LANDING_PAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingPageCodes() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGE_CODES,
  }
}

function fetchLandingPageCodesSuccess({landing_page, landing_page_codes}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_CODES_SUCCESS,
    landingPage: landing_page,
    landingPageCodes: landing_page_codes,
  }
}

function fetchLandingPageCodesFailure(error) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_CODES_FAILURE,
    error,
  }
}

export function fetchLandingPageCodes(landingPageId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPageCodes())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}/get_code`, params)
      .then(res => dispatch(fetchLandingPageCodesSuccess(res.data)))
      .catch(error => dispatch(fetchLandingPageCodesFailure(error)))
  }
}

function setIsFetchingLandingPagePagespeedInsights() {
  return {
    type: actionTypes.SET_IS_FETCHING_FACEBOOK_PAGESPEED_INSIGHTS,
  }
}

function fetchLandingPagePagespeedInsightsSuccess({landingPage, landing_page_pagespeed_insights}) {
  return {
    type: actionTypes.FETCH_FACEBOOK_PAGESPEED_INSIGHTS_SUCCESS,
    landingPage: landingPage,
    landingPagePagespeedInsights: landing_page_pagespeed_insights,
  }
}

function fetchLandingPagePagespeedInsightsFailure(error) {
  return {
    type: actionTypes.FETCH_FACEBOOK_PAGESPEED_INSIGHTS_FAILURE,
    error,
  }
}

export function fetchLandingPagePagespeedInsights(landingPageId, params = {}) {
  return dispatch => {
    dispatch(setIsFetchingLandingPagePagespeedInsights())
    authRequest
      .fetchEntities(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}/${landingPageId}/pagespeed_insights`, params)
      .then(res => dispatch(fetchLandingPagePagespeedInsightsSuccess(res.data)))
      .catch(error => dispatch(fetchLandingPagePagespeedInsightsFailure(error)))
  }
}