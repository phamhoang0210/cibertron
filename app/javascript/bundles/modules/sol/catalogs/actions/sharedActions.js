import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  SOL_BASE_URL, COURSES_API_PATH
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
  return dispatch => {
    dispatch(setIsFetchingCourses())
    authRequest
      .fetchEntities(`${SOL_BASE_URL}${COURSES_API_PATH}`, params)
      .then(res => dispatch(fetchCoursesSuccess(res.data)))
      .catch(error => dispatch(fetchCoursesFailure(error)))
  }
}
