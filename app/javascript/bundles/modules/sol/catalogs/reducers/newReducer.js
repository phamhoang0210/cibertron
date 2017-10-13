import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  catalog: null,
  isCreatingCatalog: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_CATALOG: {
      return $$state.merge({
        isCreatingCatalog: true,
      })
    }

    case actionTypes.CREATE_CATALOG_SUCCESS: {
      return $$state.merge({
        isCreatingCatalog: false,
        catalog: record,
        alert: createSuccessAlert(`Catalog was successfully created.`),
      })
    }

    case actionTypes.CREATE_CATALOG_FAILURE: {
      return $$state.merge({
        isCreatingCatalog: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
