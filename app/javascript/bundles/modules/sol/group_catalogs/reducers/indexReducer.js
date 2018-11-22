import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  groupCatalogs: [],
  groupCatalogFilters: {
    ...defaultFilters,
    fields: 'group_catalogs{catalog{}}'
  },
  isFetchingGroupCatalogs: false,
  isDeletingGroupCatalog: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, groupCatalogId,
  } = action
  switch (type) {
    case actionTypes.SET_IS_FETCHING_GROUP_CATALOGS: {
      return $$state.merge({
        alert: null,
        isFetchingGroupCatalogs: true,
      })
    }

    case actionTypes.FETCH_GROUP_CATALOGS_SUCCESS: {
      return $$state.merge({
        isFetchingGroupCatalogs: false,
        groupCatalogs: records,
        groupCatalogFilters: filters,
      })
    }

    case actionTypes.FETCH_GROUP_CATALOGS_FAILURE: {
      return $$state.merge({
        isFetchingGroupCatalogs: false,
      })
    }

    case actionTypes.SET_IS_DELETING_GROUP_CATALOG: {
      return $$state.merge({
        isDeletingGroupCatalog: true,
        alert: null,
      })
    }

    case actionTypes.DELETE_GROUP_CATALOG_SUCCESS: {
      return $$state.merge({
        isDeletingGroupCatalog: false,
        alert: createSuccessAlert('Group Catalog was successfully deleted'),
      })
    }

    case actionTypes.DELETE_GROUP_CATALOG_FAILURE: {
      return $$state.merge({
        isDeletingGroupCatalog: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
