import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  nodes: [],
  categories: [],
  isFetchingNodes: false,
  isFetchingCategories: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_NODES: {
      return $$state.merge({
        isFetchingNodes: true,
      })
    }

    case actionTypes.FETCH_NODES_SUCCESS: {
      return $$state.merge({
        isFetchingNodes: false,
        nodes: records,
      })
    }

    case actionTypes.FETCH_NODES_FAILURE: {
      return $$state.merge({
        isFetchingNodes: false,
      })
    }
    
    default: {
      return $$state
    }
  }
}
