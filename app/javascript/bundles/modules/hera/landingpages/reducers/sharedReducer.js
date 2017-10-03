import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  providers: [],
  categories: [],
  isFetchingProviders: false,
  isFetchingCategories: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PROVIDERS: {
      return $$state.merge({
        isFetchingProviders: true,
      })
    }

    case actionTypes.FETCH_PROVIDERS_SUCCESS: {
      return $$state.merge({
        isFetchingProviders: false,
        providers: records,
      })
    }

    case actionTypes.FETCH_PROVIDERS_FAILURE: {
      return $$state.merge({
        isFetchingProviders: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_CATEGORIES: {
      return $$state.merge({
        isFetchingCategories: true,
      })
    }

    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        isFetchingCategories: false,
        categories: records,
      })
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      return $$state.merge({
        isFetchingCategories: false,
      })
    }


    default: {
      return $$state
    }
  }
}
