import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  department: null,
  isFetchingDepartment: false,
  isUpdatingDepartment: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, departmentId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DEPARTMENT: {
      return $$state.merge({
        isFetchingDepartment: true,
        alert: null,
        department: null,
      })
    }

    case actionTypes.FETCH_DEPARTMENT_SUCCESS: {
      return $$state.merge({
        isFetchingDepartment: false,
        department: record,
      })
    }

    case actionTypes.FETCH_DEPARTMENT_FAILURE: {
      return $$state.merge({
        isFetchingDepartment: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_DEPARTMENT: {
      return $$state.merge({
        isUpdatingDepartment: true,
      })
    }

    case actionTypes.UPDATE_DEPARTMENT_SUCCESS: {
      return $$state.merge({
        isUpdatingDepartment: false,
        department: record,
        alert: createSuccessAlert('Department was successfully updated'),
      }).update('department', departmentItem => (
        departmentItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_DEPARTMENT_FAILURE: {
      return $$state.merge({
        isUpdatingDepartment: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
