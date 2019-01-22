import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  domain: null,
  swapDomains: [],
  isCreatingDomain: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_DOMAIN: {
      return $$state.merge({
        isCreatingDomain: true,
      })
    }

    case actionTypes.CREATE_DOMAIN_SUCCESS: {
      return $$state.merge({
        isCreatingDomain: false,
        domain: record,
        alert: createSuccessAlert(`Domain was successfully created. {name: ${record.name}}`),
      })
    }

    case actionTypes.CREATE_DOMAIN_FAILURE: {
      return $$state.merge({
        isCreatingDomain: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_SWAP_DOMAINS: {
      return $$state.merge({
        isFetchingSwapDomains: true,
      })
    }

    case actionTypes.FETCH_SWAP_DOMAINS_SUCCESS: {
      return $$state.merge({
        isFetchingSwapDomains: false,
        swapDomains: records,
        domainFilters: filters,
      })
    }

    case actionTypes.FETCH_SWAP_DOMAINS_FAILURE: {
      return $$state.merge({
        isFetchingSwapDomains: false,
      })
    }

    default: {
      return $$state
    }
  }
}
