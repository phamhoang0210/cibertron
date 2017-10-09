import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  discount: null,
  isCreatingDiscount: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_DISCOUNT: {
      return $$state.merge({
        isCreatingDiscount: true,
      })
    }

    case actionTypes.CREATE_DISCOUNT_SUCCESS: {
      return $$state.merge({
        isCreatingDiscount: false,
        discount: record,
        alert: createSuccessAlert(`Discount was successfully created.`),
      })
    }

    case actionTypes.CREATE_DISCOUNT_FAILURE: {
      return $$state.merge({
        isCreatingDiscount: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
