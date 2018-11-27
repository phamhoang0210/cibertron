import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  catalogs: [],
  isFetchingCatalogs: false,
})

export default function sharedReducer($$state = initialState, action = null) {

  const { type, record, records, filters, error } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CATALOGS: {
      return $$state.merge({
        isFetchingCatalogs: true,
      })
    }

    case actionTypes.FETCH_CATALOGS_SUCCESS: {
      return $$state.merge({
        isFetchingCatalogs: false,
        catalogs: records,
      })
    }

    case actionTypes.FETCH_CATALOGS_FAILURE: {
      return $$state.merge({
        isFetchingCatalogs: false,
      })
    }

    default: {
      return $$state
    }
  }
}
