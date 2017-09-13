import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  channel: null,
  isFetchingChannel: false,
  isUpdatingChannel: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, channelId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CHANNEL: {
      return $$state.merge({
        isFetchingChannel: true,
        alert: null,
        channel: null,
      })
    }

    case actionTypes.FETCH_CHANNEL_SUCCESS: {
      return $$state.merge({
        isFetchingChannel: false,
        channel: record,
      })
    }

    case actionTypes.FETCH_CHANNEL_FAILURE: {
      return $$state.merge({
        isFetchingChannel: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CHANNEL: {
      return $$state.merge({
        isUpdatingChannel: true,
      })
    }

    case actionTypes.UPDATE_CHANNEL_SUCCESS: {
      return $$state.merge({
        isUpdatingChannel: false,
        channel: record,
        alert: createSuccessAlert('Channel was successfully updated'),
      })
    }

    case actionTypes.UPDATE_CHANNEL_FAILURE: {
      return $$state.merge({
        isUpdatingChannel: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
