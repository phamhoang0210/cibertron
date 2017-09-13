import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  provider: null,
  isCreatingProvider: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_PROVIDER: {
      return $$state.merge({
        isCreatingProvider: true,
      })
    }

    case actionTypes.CREATE_PROVIDER_SUCCESS: {
      return $$state.merge({
        isCreatingProvider: false,
        provider: record,
        alert: createSuccessAlert('Provider was successfully created'),
      })
    }

    case actionTypes.CREATE_PROVIDER_FAILURE: {
      return $$state.merge({
        isCreatingProvider: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
