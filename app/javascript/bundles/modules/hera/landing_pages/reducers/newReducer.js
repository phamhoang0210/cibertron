import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  landingPage: null,
  isCreatingLandingPage: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_LANDING_PAGE: {
      return $$state.merge({
        isCreatingLandingPage: true,
      })
    }

    case actionTypes.CREATE_LANDING_PAGE_SUCCESS: {
      return $$state.merge({
        isCreatingLandingPage: false,
        landingPage: record,
        alert: createSuccessAlert(`LandingPage was successfully created. {name: ${record.name}}`),
      })
    }

    case actionTypes.CREATE_LANDING_PAGE_FAILURE: {
      return $$state.merge({
        isCreatingLandingPage: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
