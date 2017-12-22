import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  list: null,
  isCreatingList: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_LIST: {
      return $$state.merge({
        isCreatingList: true,
      })
    }

    case actionTypes.CREATE_LIST_SUCCESS: {
      return $$state.merge({
        isCreatingList: false,
        list: record,
        alert: createSuccessAlert(`List was successfully created.}`),
      })
    }

    case actionTypes.CREATE_LIST_FAILURE: {
      return $$state.merge({
        isCreatingList: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
