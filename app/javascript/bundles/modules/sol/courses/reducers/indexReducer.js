import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  courses: [],
  courseFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingCourses: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, courseId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_COURSES: {
      return $$state.merge({
        isFetchingNodes: true,
      })
    }

    case actionTypes.FETCH_COURSES_SUCCESS: {
      return $$state.merge({
        isFetchingNodes: false,
        courses: records,
        courseFilters: filters,
      })
    }

    case actionTypes.FETCH_COURSES_FAILURE: {
      return $$state.merge({
        isFetchingNodes: false,
      })
    }

    case actionTypes.SET_IS_DELETING_COURSE: {
      $$state.withMutations(state => (
        state.update('courses', courses => (
          courses.update(
            courses.findIndex(c => c.get('id') == courseId),
            courseItem => (
              courseItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COURSE_SUCCESS: {
      $$state.withMutations(state => (
        state.update('courses', courses => (
          courses.update(
            courses.findIndex(c => c.get('id') == courseId),
            courseItem => (
              courseItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COURSE_FAILURE: {
      $$state.withMutations(state => (
        state.update('courses', courses => (
          courses.update(
            courses.findIndex(c => c.get('id') == courseId),
            courseItem => (
              courseItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }
    
    default: {
      return $$state
    }
  }
}
