import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  groupCatalog: null,
  isFetchingGroupCatalog: false,
  isUpdatingGroupCatalog: false,
  groupCatalogFilters: {
    ...defaultFilters,
    fields: 'group_catalogs{catalog{}}'
  },
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, groupCatalogId, index } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_GROUP_CATALOG: {
      return $$state.merge({
        isFetchingGroupCatalog: true,
        alert: null,
        groupCatalog: null,
      })
    }

    case actionTypes.FETCH_GROUP_CATALOG_SUCCESS: {
      return $$state.merge({
        isFetchingGroupCatalog: false,
        groupCatalog: record,
        groupCatalogFilters: filters,
      })
    }

    case actionTypes.FETCH_GROUP_CATALOG_FAILURE: {
      return $$state.merge({
        isFetchingGroupCatalog: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_GROUP_CATALOG: {
      return $$state.merge({
        isUpdatingGroupCatalog: true,
      })
    }

    case actionTypes.UPDATE_GROUP_CATALOG_SUCCESS: {
      return $$state.merge({
        isUpdatingGroupCatalog: false,
        alert: createSuccessAlert('Group Catalog was successfully updated'),
      }).update('groupCatalog', groupCatalogItem => (
        groupCatalogItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_GROUP_CATALOG_FAILURE: {
      return $$state.merge({
        isUpdatingGroupCatalog: false,
        alert: parseError(error)
      })
    }

    case actionTypes.DELETE_CATALOG: {
      return $$state.setIn(
        ['groupCatalog', 'group_catalogs'],
        $$state.getIn(['groupCatalog', 'group_catalogs']).filter((key, i) => i !== index)
      )
    }

    default: {
      return $$state
    }
  }
}
