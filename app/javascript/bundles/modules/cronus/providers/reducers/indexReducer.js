import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  providers: [],
  providerFilters: {
    ...defaultFilters,
    fields: 'provider{},provider{}'
  },
  isFetchingProviders: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, providerId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PROVIDERS: {
      return $$state.merge({
        isFetchingProviders: true,
      })
    }

    case actionTypes.FETCH_PROVIDERS_SUCCESS: {
      return $$state.merge({
        isFetchingProviders: false,
        providers: records,
        providerFilters: filters,
      })
    }

    case actionTypes.FETCH_PROVIDERS_FAILURE: {
      return $$state.merge({
        isFetchingProviders: false,
      })
    }

    case actionTypes.SET_IS_DELETING_PROVIDER: {
      $$state.withMutations(state => (
        state.update('providers', providers => (
          providers.update(
            providers.findIndex(c => c.get('id') == providerId),
            providerItem => (
              providerItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROVIDER_SUCCESS: {
      $$state.withMutations(state => (
        state.update('providers', providers => (
          providers.update(
            providers.findIndex(c => c.get('id') == providerId),
            providerItem => (
              providerItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROVIDER_FAILURE: {
      $$state.withMutations(state => (
        state.update('providers', providers => (
          providers.update(
            providers.findIndex(c => c.get('id') == providerId),
            providerItem => (
              providerItem.merge({
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
