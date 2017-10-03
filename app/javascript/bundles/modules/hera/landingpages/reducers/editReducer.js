import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  landingpage: null,
  isFetchingLandingpage: false,
  isUpdatingLandingpage: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, landingpageId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LANDINGPAGE: {
      return $$state.merge({
        isFetchingLandingpage: true,
        alert: null,
        landingpage: null,
      })
    }

    case actionTypes.FETCH_LANDINGPAGE_SUCCESS: {
      return $$state.merge({
        isFetchingLandingpage: false,
        landingpage: record,
      })
    }

    case actionTypes.FETCH_LANDINGPAGE_FAILURE: {
      return $$state.merge({
        isFetchingLandingpage: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LANDINGPAGE: {
      return $$state.merge({
        isUpdatingLandingpage: true,
      })
    }

    case actionTypes.UPDATE_LANDINGPAGE_SUCCESS: {
      return $$state.merge({
        isUpdatingLandingpage: false,
        alert: createSuccessAlert('Landingpage was successfully updated'),
      }).update('landingpage', landingpageItem => (
        landingpageItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_LANDINGPAGE_FAILURE: {
      return $$state.merge({
        isUpdatingLandingpage: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
