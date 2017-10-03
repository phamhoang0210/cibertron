import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {HERA_BASE_URL, LANDINGPAGES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

function setIsCreatingLandingpage() {
  return {
    type: actionTypes.SET_IS_CREATING_LANDINGPAGE,
  }
}

function createLandingpageSucces(record) {
  return {
    type: actionTypes.CREATE_LANDINGPAGE_SUCCESS,
    record
  }
}

function createLandingpageFailure(error) {
  return {
    type: actionTypes.CREATE_LANDINGPAGE_FAILURE,
    error,
  }
}

export function createLandingpage(params = {}) {
  return dispatch => {
    dispatch(setIsCreatingLandingpage())

    return authRequest
      .submitEntity(`${HERA_BASE_URL}${LANDINGPAGES_API_PATH}`, params)
      .then(res => dispatch(createLandingpageSucces(res.data)))
      .catch(error => dispatch(createLandingpageFailure(error)))
  }
}