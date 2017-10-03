import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  landingpage: null,
  isCreatingLandingpage: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_LANDINGPAGE: {
      return $$state.merge({
        isCreatingLandingpage: true,
      })
    }

    case actionTypes.CREATE_LANDINGPAGE_SUCCESS: {
      return $$state.merge({
        isCreatingLandingpage: false,
        landingpage: record,
        alert: createSuccessAlert(`Landingpage was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_LANDINGPAGE_FAILURE: {
      return $$state.merge({
        isCreatingLandingpage: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
