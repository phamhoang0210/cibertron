import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  targets: [],
  targetFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingTargets: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, targetId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_TARGETS: {
      return $$state.merge({
        isFetchingTargets: true,
      })
    }

    case actionTypes.FETCH_TARGETS_SUCCESS: {
      return $$state.merge({
        isFetchingTargets: false,
        targets: records,
        targetFilters: filters,
      })
    }

    case actionTypes.FETCH_TARGETS_FAILURE: {
      return $$state.merge({
        isFetchingTargets: false,
      })
    }

    case actionTypes.SET_IS_DELETING_TARGET: {
      $$state.withMutations(state => (
        state.update('targets', targets => (
          targets.update(
            targets.findIndex(c => c.get('id') == targetId),
            targetItem => (
              targetItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_TARGET_SUCCESS: {
      $$state.withMutations(state => (
        state.update('targets', targets => (
          targets.update(
            targets.findIndex(c => c.get('id') == targetId),
            targetItem => (
              targetItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_TARGET_FAILURE: {
      $$state.withMutations(state => (
        state.update('targets', targets => (
          targets.update(
            targets.findIndex(c => c.get('id') == targetId),
            targetItem => (
              targetItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }
    
    default: {
      return $$state
    }
  }
}
