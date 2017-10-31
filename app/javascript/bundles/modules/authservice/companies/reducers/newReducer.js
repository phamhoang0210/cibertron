import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  company: null,
  isCreatingCompany: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_COMPANY: {
      return $$state.merge({
        isCreatingCompany: true,
      })
    }

    case actionTypes.CREATE_COMPANY_SUCCESS: {
      return $$state.merge({
        isCreatingCompany: false,
        company: record,
        alert: createSuccessAlert(`Company was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_COMPANY_FAILURE: {
      return $$state.merge({
        isCreatingCompany: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
