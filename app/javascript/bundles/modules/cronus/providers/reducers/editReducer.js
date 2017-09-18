import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  provider: null,
  isFetchingProvider: false,
  isUpdatingProvider: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, providerId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PROVIDER: {
      return $$state.merge({
        isFetchingProvider: true,
        alert: null,
        provider: null,
      })
    }

    case actionTypes.FETCH_PROVIDER_SUCCESS: {
      return $$state.merge({
        isFetchingProvider: false,
        provider: record,
      })
    }

    case actionTypes.FETCH_PROVIDER_FAILURE: {
      return $$state.merge({
        isFetchingProvider: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_PROVIDER: {
      return $$state.merge({
        isUpdatingProvider: true,
      })
    }

    case actionTypes.UPDATE_PROVIDER_SUCCESS: {
      return $$state.merge({
        isUpdatingProvider: false,
        provider: record,
        alert: createSuccessAlert('Provider was successfully updated'),
      }).update('provider', providerItem => (
        providerItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_PROVIDER_FAILURE: {
      return $$state.merge({
        isUpdatingProvider: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
