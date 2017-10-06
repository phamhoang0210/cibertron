import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDING_PAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingLandingPage() {
  return {
    type: actionTypes.SET_IS_CREATING_LANDING_PAGE,
  }
}

function createLandingPageSucces(record) {
  return {
    type: actionTypes.CREATE_LANDING_PAGE_SUCCESS,
    record
  }
}

function createLandingPageFailure(error) {
  return {
    type: actionTypes.CREATE_LANDING_PAGE_FAILURE,
    error,
  }
}

export function createLandingPage(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingLandingPage())

    return authRequest
      .submitEntity(`${HERA_BASE_URL}${LANDING_PAGES_API_PATH}`, params)
      .then(res => dispatch(createLandingPageSucces(res.data)))
      .catch(error => dispatch(createLandingPageFailure(error)))
  }
}