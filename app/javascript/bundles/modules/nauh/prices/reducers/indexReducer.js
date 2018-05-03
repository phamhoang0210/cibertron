import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  prices: [],
  priceFilters: {
    ...defaultFilters,
    fields: 'lead{},payment{payment_method{},payment_detail{}},price_level{}'
  },
  isFetchingPrices: false
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, priceId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PRICES: {
      return $$state.merge({
        isFetchingPrices: true,
      })
    }

    case actionTypes.FETCH_PRICES_SUCCESS: {
      return $$state.merge({
        isFetchingPrices: false,
        prices: records,
        priceFilters: filters,
      })
    }

    case actionTypes.FETCH_PRICES_FAILURE: {
      return $$state.merge({
        isFetchingPrices: false,
      })
    }

    case actionTypes.SET_IS_DELETING_PRICE: {
      return $$state.withMutations(state => (
        state.update('prices', prices => (
          prices.update(
            prices.findIndex(c => c.get('id') == priceId),
            priceItem => (
              priceItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PRICE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('prices', prices => (
          prices.update(
            prices.findIndex(c => c.get('id') == priceId),
            priceItem => (
              priceItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PRICE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('prices', prices => (
          prices.update(
            prices.findIndex(c => c.get('id') == priceId),
            priceItem => (
              priceItem.merge({
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
