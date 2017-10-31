import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  departments: [],
  departmentFilters: {
    ...defaultFilters,
    fields: 'sup_department{},company{}'
  },
  isFetchingDepartments: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, departmentId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DEPARTMENTS: {
      return $$state.merge({
        isFetchingDepartments: true,
      })
    }

    case actionTypes.FETCH_DEPARTMENTS_SUCCESS: {
      return $$state.merge({
        isFetchingDepartments: false,
        departments: records,
        departmentFilters: filters,
      })
    }

    case actionTypes.FETCH_DEPARTMENTS_FAILURE: {
      return $$state.merge({
        isFetchingDepartments: false,
      })
    }

    case actionTypes.SET_IS_DELETING_DEPARTMENT: {
      return $$state.withMutations(state => (
        state.update('departments', departments => (
          departments.update(
            departments.findIndex(c => c.get('id') == departmentId),
            departmentItem => (
              departmentItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_DEPARTMENT_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('departments', departments => (
          departments.update(
            departments.findIndex(c => c.get('id') == departmentId),
            departmentItem => (
              departmentItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_DEPARTMENT_FAILURE: {
      return $$state.withMutations(state => (
        state.update('departments', departments => (
          departments.update(
            departments.findIndex(c => c.get('id') == departmentId),
            departmentItem => (
              departmentItem.merge({
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
