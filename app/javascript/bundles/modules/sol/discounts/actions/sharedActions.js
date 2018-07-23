import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  COURSES_API_PATH, COMBOS_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'


function setIsFetchingCourses() {
  return {
    type: actionTypes.SET_IS_FETCHING_COURSES,
  }
}

function fetchCoursesSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COURSES_SUCCESS,
    records,
    filters,
  }
}

function fetchCoursesFailure(error) {
  return {
    type: actionTypes.FETCH_COURSES_FAILURE,
    error,
  }
}

export function fetchCourses(params = {}) {
  let keyword=""
  if (params['keyword']) {
    keyword = params['keyword']
  }
  return dispatch => {
    dispatch(setIsFetchingCourses())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COURSES_API_PATH}`, {'full_search': keyword})
      .then(res => dispatch(fetchCoursesSuccess(res.data)))
      .catch(error => dispatch(fetchCoursesFailure(error)))
  }
}

function setIsFetchingCombos() {
  return {
    type: actionTypes.SET_IS_FETCHING_COMBOS,
  }
}

function fetchCombosSuccess({records, filters}) {
  return {
    type: actionTypes.FETCH_COMBOS_SUCCESS,
    records,
    filters,
  }
}

function fetchCombosFailure(error) {
  return {
    type: actionTypes.FETCH_COMBOS_FAILURE,
    error,
  }
}

export function fetchCombos(params = {}) {
  let keyword=""
  if (params['keyword']) {
    keyword = params['keyword']
  }
  return dispatch => {
    dispatch(setIsFetchingCombos())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COMBOS_API_PATH}`, {'full_search': keyword})
      .then(res => dispatch(fetchCombosSuccess(res.data)))
      .catch(error => dispatch(fetchCombosFailure(error)))
  }
}