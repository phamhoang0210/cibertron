import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  sender: null,
  isCreatingSender: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_SENDER: {
      return $$state.merge({
        isCreatingSender: true,
      })
    }

    case actionTypes.CREATE_SENDER_SUCCESS: {
      return $$state.merge({
        isCreatingSender: false,
        sender: record,
        alert: createSuccessAlert(`Sender tạo thành công!`),
      })
    }

    case actionTypes.CREATE_SENDER_FAILURE: {
      return $$state.merge({
        isCreatingSender: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state.merge({
        alert: null
      })
    }
  }
}
