import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  sender: null,
  isFetchingSender: false,
  isUpdatingSender: false,
})

export default function editReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, senderId,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_SENDER: {
      return $$state.merge({
        isFetchingSender: true,
        notification: null,
        sender: null,
      })
    }

    case actionTypes.FETCH_SENDER_SUCCESS: {
      return $$state.merge({
        isFetchingSender: false,
        sender: record,
      })
    }

    case actionTypes.FETCH_SENDER_FAILURE: {
      return $$state.merge({
        isFetchingSender: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_SENDER: {
      return $$state.merge({
        isUpdatingSender: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_SENDER_SUCCESS: {
      return $$state.merge({
        isUpdatingSender: false,
        alert: createSuccessAlert('Cập nhật thành công!'),
      }).update('sender', senderItem => (
        senderItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_SENDER_FAILURE: {
      return $$state.merge({
        isUpdatingSender: false,
        notification: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
