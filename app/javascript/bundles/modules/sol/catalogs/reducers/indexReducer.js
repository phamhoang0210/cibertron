import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  catalogs: [],
  catalogFilters: {
    ...defaultFilters,
    fields: 'catalog_courses{course{}}'
  },
  isFetchingCatalogs: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, catalogId,
  } = action
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
        catalogFilters: filters,
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
