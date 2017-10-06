import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  landingPage: null,
  landingPageCodes: {},
  isFetchingLandingPageCodes: false,
})

export default function getCodeReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, landingPage, landingPageCodes } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LANDING_PAGE_CODES: {
      return $$state.merge({
        isFetchingLandingPageCodes: true,
        alert: null,
      })
    }

    case actionTypes.FETCH_LANDING_PAGE_CODES_SUCCESS: {
      return $$state.merge({
        isFetchingLandingPageCodes: false,
        landingPage,
        landingPageCodes,
        alert: null,
      })
    }

    case actionTypes.FETCH_LANDING_PAGE_CODES_FAILURE: {
      return $$state.merge({
        isFetchingLandingPageCodes: false,
        alert: parseError(error),
      })
    }
    default: {
      return $$state
    }
  }
}
