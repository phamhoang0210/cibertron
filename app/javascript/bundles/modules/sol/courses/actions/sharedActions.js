import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  COURSES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'


function setIsFetchingCourses() {
  return {
    type: actionTypes.SET_IS_FETCHING_COURSES,
  }
}