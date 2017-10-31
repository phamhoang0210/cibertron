import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  role: null,
  isCreatingRole: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_ROLE: {
      return $$state.merge({
        isCreatingRole: true,
      })
    }

    case actionTypes.CREATE_ROLE_SUCCESS: {
      return $$state.merge({
        isCreatingRole: false,
        role: record,
        alert: createSuccessAlert(`Role was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_ROLE_FAILURE: {
      return $$state.merge({
        isCreatingRole: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
