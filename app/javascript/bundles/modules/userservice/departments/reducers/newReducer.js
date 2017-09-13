import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  department: null,
  isCreatingDepartment: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_DEPARTMENT: {
      return $$state.merge({
        isCreatingDepartment: true,
      })
    }

    case actionTypes.CREATE_DEPARTMENT_SUCCESS: {
      return $$state.merge({
        isCreatingDepartment: false,
        department: record,
        alert: createSuccessAlert('Department was successfully created'),
      })
    }

    case actionTypes.CREATE_DEPARTMENT_FAILURE: {
      return $$state.merge({
        isCreatingDepartment: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
