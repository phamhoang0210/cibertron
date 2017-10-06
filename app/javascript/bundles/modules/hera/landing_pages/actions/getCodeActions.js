import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDING_PAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsFetchingLandingPageCodes() {
  return {
    type: actionTypes.SET_IS_FETCHING_LANDING_PAGE_CODES,
  }
}

function fetchLandingPageCodesSuccess({landingPage, landing_page_codes}) {
  return {
    type: actionTypes.FETCH_LANDING_PAGE_CODES_SUCCESS,
    landingPage: landingPage,
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