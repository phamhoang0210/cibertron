import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  notification: null,
  accounts: [],
  accountFilters: {
    ...defaultFilters,
    fields: 'department{},role{},adminrole{},company{}'
  },
  isFetchingAccounts: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, accountId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ACCOUNTS: {
      return $$state.merge({
        isFetchingAccounts: true,
      })
    }

    case actionTypes.FETCH_ACCOUNTS_SUCCESS: {
      return $$state.merge({
        isFetchingAccounts: false,
        accounts: records,
        accountFilters: filters,
      })
    }

    case actionTypes.FETCH_ACCOUNTS_FAILURE: {
      return $$state.merge({
        isFetchingAccounts: false,
      })
    }

    case actionTypes.SET_IS_DELETING_ACCOUNT: {
      return $$state.withMutations(state => (
        state.update('accounts', accounts => (
          accounts.update(
            accounts.findIndex(c => c.get('id') == accountId),
            accountItem => (
              accountItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          notification: null
        })
      ))
    }

    case actionTypes.DELETE_ACCOUNT_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('accounts', accounts => (
          accounts.update(
            accounts.findIndex(c => c.get('id') == accountId),
            accountItem => (
              accountItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_ACCOUNT_FAILURE: {
      return $$state.withMutations(state => (
        state.update('accounts', accounts => (
          accounts.update(
            accounts.findIndex(c => c.get('id') == accountId),
            accountItem => (
              accountItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          notification: parseError(error)
        })
      ))
    }

    default: {
      return $$state
    }
  }
}
