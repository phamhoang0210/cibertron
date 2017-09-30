import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  account: null,
  isCreatingAccount: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_ACCOUNT: {
      return $$state.merge({
        isCreatingAccount: true,
      })
    }

    case actionTypes.CREATE_ACCOUNT_SUCCESS: {
      return $$state.merge({
        isCreatingAccount: false,
        account: record,
        alert: createSuccessAlert(`Account was successfully created. {id: ${record.id}}`),
      })
    }

    case actionTypes.CREATE_ACCOUNT_FAILURE: {
      return $$state.merge({
        isCreatingAccount: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
