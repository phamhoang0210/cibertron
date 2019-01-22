import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  domain: null,
  isFetchingDomain: false,
  isUpdatingDomain: false,
  swapDomains: [],
})

export default function restoreReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, domainId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DOMAIN: {
      return $$state.merge({
        isFetchingDomain: true,
        alert: null,
        domain: null,
      })
    }

    case actionTypes.FETCH_DOMAIN_SUCCESS: {
      return $$state.merge({
        isFetchingDomain: false,
        domain: record,
      })
    }

    case actionTypes.FETCH_DOMAIN_FAILURE: {
      return $$state.merge({
        isFetchingDomain: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_DOMAIN: {
      return $$state.merge({
        isUpdatingDomain: true,
      })
    }

    case actionTypes.UPDATE_DOMAIN_SUCCESS: {
      return $$state.merge({
        isUpdatingDomain: false,
        alert: createSuccessAlert('Domain was successfully updated'),
      }).update('domain', domainItem => (
        domainItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_DOMAIN_FAILURE: {
      return $$state.merge({
        isUpdatingDomain: false,
        alert: parseError(error)
      })
    }

    //Assign domain
    case actionTypes.SET_IS_ASSIGNING_DOMAIN: {
      return $$state.merge({
        isUpdatingDomain: true,
      })
    }

    case actionTypes.ASSIGNING_DOMAIN_SUCCESS: {
      return $$state.merge({
        isUpdatingDomain: false,
        alert: createSuccessAlert('Domain was successfully updated'),
      }).update('domain', domainItem => (
        domainItem.merge(record)
      ))
    }

    case actionTypes.ASSIGNING_DOMAIN_FAILURE: {
      return $$state.merge({
        isUpdatingDomain: false,
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
