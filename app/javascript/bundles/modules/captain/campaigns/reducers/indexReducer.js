import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  promos: [],
  promoFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingPromos: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, promoId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PROMOS: {
      return $$state.merge({
        isFetchingPromos: true,
      })
    }

    case actionTypes.FETCH_PROMOS_SUCCESS: {
      return $$state.merge({
        isFetchingPromos: false,
        promos: records,
        promoFilters: filters,
      })
    }

    case actionTypes.FETCH_PROMOS_FAILURE: {
      return $$state.merge({
        isFetchingPromos: false,
      })
    }

    case actionTypes.SET_IS_DELETING_PROMO: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROMO_SUCCESS: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROMO_FAILURE: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
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
