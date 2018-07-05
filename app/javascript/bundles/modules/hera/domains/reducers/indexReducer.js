import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  domains: [],
  domainFilters: {
    ...defaultFilters,
    fields: 'landing_page{}'
  },
  users: [],
  isFetchingDomains: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, domainId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_DOMAINS: {
      return $$state.merge({
        isFetchingDomains: true,
      })
    }

    case actionTypes.FETCH_DOMAINS_SUCCESS: {
      return $$state.merge({
        isFetchingDomains: false,
        domains: records,
        domainFilters: filters,
      })
    }

    case actionTypes.FETCH_DOMAINS_FAILURE: {
      return $$state.merge({
        isFetchingDomains: false,
      })
    }

    case actionTypes.SET_IS_DELETING_DOMAIN: {
      return $$state.withMutations(state => (
        state.update('domains', domains => (
          domains.update(
            domains.findIndex(c => c.get('id') == domainId),
            domainItem => (
              domainItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_DOMAIN_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('domains', domains => (
          domains.update(
            domains.findIndex(c => c.get('id') == domainId),
            domainItem => (
              domainItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_DOMAIN_FAILURE: {
      return $$state.withMutations(state => (
        state.update('domains', domains => (
          domains.update(
            domains.findIndex(c => c.get('id') == domainId),
            domainItem => (
              domainItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    // Fetch users
    case actionTypes.SET_IS_FETCHING_USERS: {
      return $$state.merge({
        isFetchingUsers: true,
      })
    }

    case actionTypes.FETCH_USERS_SUCCESS: {
      return $$state.merge({
        isFetchingUsers: false,
        users: records,
      })
    }

    case actionTypes.FETCH_USERS_FAILURE: {
      return $$state.merge({
        isFetchingUsers: false,
      })
    }
    default: {
      return $$state
    }
  }
}
