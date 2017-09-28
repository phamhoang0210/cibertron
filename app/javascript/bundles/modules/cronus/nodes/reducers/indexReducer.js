import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  nodes: [],
  nodeFilters: {
    ...defaultFilters,
    fields: 'channel{},category{}'
  },
  isFetchingNodes: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, nodeId } = action
  
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
        nodeFilters: filters,
      })
    }

    case actionTypes.FETCH_NODES_FAILURE: {
      return $$state.merge({
        isFetchingNodes: false,
      })
    }

    case actionTypes.SET_IS_DELETING_NODE: {
      return $$state.withMutations(state => (
        state.update('nodes', nodes => (
          nodes.update(
            nodes.findIndex(c => c.get('id') == nodeId),
            nodeItem => (
              nodeItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_NODE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('nodes', nodes => (
          nodes.update(
            nodes.findIndex(c => c.get('id') == nodeId),
            nodeItem => (
              nodeItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_NODE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('nodes', nodes => (
          nodes.update(
            nodes.findIndex(c => c.get('id') == nodeId),
            nodeItem => (
              nodeItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    default: {
      return $$state
    }
  }
}
