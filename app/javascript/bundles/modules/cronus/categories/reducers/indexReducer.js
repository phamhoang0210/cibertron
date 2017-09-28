import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  categories: [],
  categoryFilters: {
    ...defaultFilters,
    fields: 'provider{},category{}'
  },
  isFetchingCategories: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, categoryId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CATEGORIES: {
      return $$state.merge({
        isFetchingCategories: true,
      })
    }

    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        isFetchingCategories: false,
        categories: records,
        categoryFilters: filters,
      })
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      return $$state.merge({
        isFetchingCategories: false,
      })
    }

    case actionTypes.SET_IS_DELETING_CATEGORY: {
      return $$state.withMutations(state => (
        state.update('categories', categories => (
          categories.update(
            categories.findIndex(c => c.get('id') == categoryId),
            categoryItem => (
              categoryItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('categories', categories => (
          categories.update(
            categories.findIndex(c => c.get('id') == categoryId),
            categoryItem => (
              categoryItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_CATEGORY_FAILURE: {
      return $$state.withMutations(state => (
        state.update('categories', categories => (
          categories.update(
            categories.findIndex(c => c.get('id') == categoryId),
            categoryItem => (
              categoryItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    default: {
      return $$state
    }
  }
}
