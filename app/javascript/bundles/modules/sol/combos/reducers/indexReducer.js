import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  combos: [],
  comboFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingCombos: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, comboId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_COMBOS: {
      return $$state.merge({
        isFetchingNodes: true,
      })
    }

    case actionTypes.FETCH_COMBOS_SUCCESS: {
      return $$state.merge({
        isFetchingNodes: false,
        combos: records,
        comboFilters: filters,
      })
    }

    case actionTypes.FETCH_COMBOS_FAILURE: {
      return $$state.merge({
        isFetchingNodes: false,
      })
    }

    case actionTypes.SET_IS_DELETING_COMBO: {
      $$state.withMutations(state => (
        state.update('combos', combos => (
          combos.update(
            combos.findIndex(c => c.get('id') == comboId),
            comboItem => (
              comboItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COMBO_SUCCESS: {
      $$state.withMutations(state => (
        state.update('combos', combos => (
          combos.update(
            combos.findIndex(c => c.get('id') == comboId),
            comboItem => (
              comboItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_COMBO_FAILURE: {
      $$state.withMutations(state => (
        state.update('combos', combos => (
          combos.update(
            combos.findIndex(c => c.get('id') == comboId),
            comboItem => (
              comboItem.merge({
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
