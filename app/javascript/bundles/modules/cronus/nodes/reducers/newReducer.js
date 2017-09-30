import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  node: null,
  isCreatingNode: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_NODE: {
      return $$state.merge({
        isCreatingNode: true,
      })
    }

    case actionTypes.CREATE_NODE_SUCCESS: {
      return $$state.merge({
        isCreatingNode: false,
        node: record,
        alert: createSuccessAlert(`Node was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_NODE_FAILURE: {
      return $$state.merge({
        isCreatingNode: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
