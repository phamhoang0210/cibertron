import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  catalog: null,
  isFetchingCatalog: false,
  isUpdatingCatalog: false,
  catalogFilters: {
    ...defaultFilters,
    fields: 'catalog_courses{course{}}'
  },
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, catalogId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CATALOG: {
      return $$state.merge({
        isFetchingCatalog: true,
        alert: null,
        catalog: null,
      })
    }

    case actionTypes.FETCH_CATALOG_SUCCESS: {
      return $$state.merge({
        isFetchingCatalog: false,
        catalog: record,
        catalogFilters: filters,
      })
    }

    case actionTypes.FETCH_CATALOG_FAILURE: {
      return $$state.merge({
        isFetchingCatalog: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CATALOG: {
      return $$state.merge({
        isUpdatingCatalog: true,
      })
    }

    case actionTypes.UPDATE_CATALOG_SUCCESS: {
      return $$state.merge({
        isUpdatingCatalog: false,
        alert: createSuccessAlert('Catalog was successfully updated'),
      }).update('catalog', catalogItem => (
        catalogItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CATALOG_FAILURE: {
      return $$state.merge({
        isUpdatingCatalog: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
