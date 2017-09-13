import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  channel: null,
  isCreatingChannel: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_CHANNEL: {
      return $$state.merge({
        isCreatingChannel: true,
      })
    }

    case actionTypes.CREATE_CHANNEL_SUCCESS: {
      return $$state.merge({
        isCreatingChannel: false,
        channel: record,
        alert: createSuccessAlert('Channel was successfully created'),
      })
    }

    case actionTypes.CREATE_CHANNEL_FAILURE: {
      return $$state.merge({
        isCreatingChannel: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
