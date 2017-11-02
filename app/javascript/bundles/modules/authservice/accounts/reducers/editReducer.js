import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  account: null,
  isFetchingAccount: false,
  isUpdatingAccount: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, accountId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_ACCOUNT: {
      return $$state.merge({
        isFetchingAccount: true,
        alert: null,
        account: null,
      })
    }

    case actionTypes.FETCH_ACCOUNT_SUCCESS: {
      return $$state.merge({
        isFetchingAccount: false,
        account: record,
      })
    }

    case actionTypes.FETCH_ACCOUNT_FAILURE: {
      return $$state.merge({
        isFetchingAccount: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_ACCOUNT: {
      return $$state.merge({
        isUpdatingAccount: true,
      })
    }

    case actionTypes.UPDATE_ACCOUNT_SUCCESS: {
      return $$state.merge({
        isUpdatingAccount: false,
        alert: createSuccessAlert('Account was successfully updated'),
      }).update('account', accountItem => (
        accountItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_ACCOUNT_FAILURE: {
      return $$state.merge({
        isUpdatingAccount: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
