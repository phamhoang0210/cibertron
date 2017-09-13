import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  isSigning: false,
})

export default function authSignInReducer($$state = initialState, action = null) {
  const { type, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_SIGNING: {
      return $$state.merge({
        isSigning: true,
        alert: null,
      })
    }

    case actionTypes.SIGN_IN_SUCCESS: {
      return $$state.merge({
        isSigning: false,
        alert: null,
      })
    }

    case actionTypes.SIGN_IN_FAILURE: {
      return $$state.merge({
        isSigning: false,
        alert: parseError(error),
      })
    }

    default: {
      return $$state
    }
  }
}
