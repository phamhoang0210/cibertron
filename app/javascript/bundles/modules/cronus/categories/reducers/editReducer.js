import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  category: null,
  isFetchingCategory: false,
  isUpdatingCategory: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, categoryId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CATEGORY: {
      return $$state.merge({
        isFetchingCategory: true,
        alert: null,
        category: null,
      })
    }

    case actionTypes.FETCH_CATEGORY_SUCCESS: {
      return $$state.merge({
        isFetchingCategory: false,
        category: record,
      })
    }

    case actionTypes.FETCH_CATEGORY_FAILURE: {
      return $$state.merge({
        isFetchingCategory: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CATEGORY: {
      return $$state.merge({
        isUpdatingCategory: true,
      })
    }

    case actionTypes.UPDATE_CATEGORY_SUCCESS: {
      return $$state.merge({
        isUpdatingCategory: false,
        alert: createSuccessAlert('Category was successfully updated'),
      }).update('category', categoryItem => (
        categoryItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CATEGORY_FAILURE: {
      return $$state.merge({
        isUpdatingCategory: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
