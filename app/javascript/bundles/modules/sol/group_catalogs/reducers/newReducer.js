import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  groupCatalog: null,
  isCreatingGroupCatalog: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_GROUP_CATALOG: {
      return $$state.merge({
        isCreatingGroupCatalog: true,
      })
    }

    case actionTypes.CREATE_GROUP_CATALOG_SUCCESS: {
      return $$state.merge({
        isCreatingGroupCatalog: false,
        groupCatalog: record,
        alert: createSuccessAlert(`GroupCatalog was successfully created.`),
      })
    }

    case actionTypes.CREATE_GROUP_CATALOG_FAILURE: {
      return $$state.merge({
        isCreatingGroupCatalog: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
