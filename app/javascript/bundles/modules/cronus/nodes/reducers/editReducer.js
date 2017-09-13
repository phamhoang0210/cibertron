import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  node: null,
  isFetchingNode: false,
  isUpdatingNode: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, nodeId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_NODE: {
      return $$state.merge({
        isFetchingNode: true,
        alert: null,
        node: null,
      })
    }

    case actionTypes.FETCH_NODE_SUCCESS: {
      return $$state.merge({
        isFetchingNode: false,
        node: record,
      })
    }

    case actionTypes.FETCH_NODE_FAILURE: {
      return $$state.merge({
        isFetchingNode: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_NODE: {
      return $$state.merge({
        isUpdatingNode: true,
      })
    }

    case actionTypes.UPDATE_NODE_SUCCESS: {
      return $$state.merge({
        isUpdatingNode: false,
        node: record,
        alert: createSuccessAlert('Node was successfully updated'),
      })
    }

    case actionTypes.UPDATE_NODE_FAILURE: {
      return $$state.merge({
        isUpdatingNode: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
