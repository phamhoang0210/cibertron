import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  category: null,
  isCreatingCategory: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_CATEGORY: {
      return $$state.merge({
        isCreatingCategory: true,
      })
    }

    case actionTypes.CREATE_CATEGORY_SUCCESS: {
      return $$state.merge({
        isCreatingCategory: false,
        category: record,
        alert: createSuccessAlert('Category was successfully created'),
      })
    }

    case actionTypes.CREATE_CATEGORY_FAILURE: {
      return $$state.merge({
        isCreatingCategory: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
