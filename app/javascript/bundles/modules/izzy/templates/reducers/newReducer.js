import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  template: null,
  isCreatingTemplate: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_TEMPLATE: {
      return $$state.merge({
        isCreatingTemplate: true,
      })
    }

    case actionTypes.CREATE_TEMPLATE_SUCCESS: {
      return $$state.merge({
        isCreatingTemplate: false,
        template: record,
        alert: createSuccessAlert(`Template was successfully created.}`),
      })
    }

    case actionTypes.CREATE_TEMPLATE_FAILURE: {
      return $$state.merge({
        isCreatingTemplate: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
