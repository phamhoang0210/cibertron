import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  lead: null,
  isCreatingLead: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_LEAD: {
      return $$state.merge({
        isCreatingLead: true,
      })
    }

    case actionTypes.CREATE_LEAD_SUCCESS: {
      return $$state.merge({
        isCreatingLead: false,
        lead: record,
        alert: createSuccessAlert(`Lead was successfully created. {email: ${record.email}}`),
      })
    }

    case actionTypes.CREATE_LEAD_FAILURE: {
      return $$state.merge({
        isCreatingLead: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
