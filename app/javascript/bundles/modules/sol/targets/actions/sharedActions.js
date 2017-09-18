import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  SOL_BASE_URL, TARGETS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'


function setIsFetchingCourses() {
  return {
    type: actionTypes.SET_IS_FETCHING_TARGETS,
  }
}

function fetchTargetsSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_TARGETS_SUCCESS,
    records,
    filters,
  }
}

function fetchTargetsFailure(error) {
  return {
    type: actionTypes.FETCH_TARGETS_FAILURE,
    error,
  }
}
