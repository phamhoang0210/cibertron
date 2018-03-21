import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {COURSES_API_PATH} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
export * from './sharedActions'

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

function setIsDeletingCourse(courseId) {
  return {
    type: actionTypes.SET_IS_DELETING_COURSE,
    courseId,
  }
}

function deleteCourseSuccess(record) {
  return {
    type: actionTypes.DELETE_COURSE_SUCCESS,
    record,
  }
}

function deleteCourseFailure(error, courseId) {
  return {
    type: actionTypes.DELETE_COURSE_FAILURE,
    error,
  }
}

export function deleteCourse(courseId) {
  return (dispatch, getStore) => {
    dispatch(setIsDeletingCourse(courseId))
    authRequest
      .deleteEntity(`${SOL_BASE_URL}${COURSES_API_PATH}/${courseId}`)
      .then(res => {
        dispatch(deleteCourseSuccess(res.data))
        const filterParams = getFilterParams(getStore().indexState.get('courseFilters'))
        dispatch(fetchCourses(filterParams))
      })
      .catch(error => dispatch(deleteCourseFailure(error, courseId)))
  }
}