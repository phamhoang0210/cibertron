import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'

export const initialState = Immutable.fromJS({
  alert: null,
  lists: [],
  listFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingLists: false,
  isUpdatingLists: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, listId,
    list
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LISTS: {
      return $$state.merge({
        isFetchingLists: true,
      })
    }

    case actionTypes.FETCH_LISTS_SUCCESS: {
      return $$state.merge({
        isFetchingLists: false,
        lists: records,
        listFilters: filters,
      })
    }

    case actionTypes.FETCH_LISTS_FAILURE: {
      return $$state.merge({
        isFetchingLists: false,
      })
    }

    case actionTypes.SET_IS_DELETING_LIST: {
      return $$state.withMutations(state => (
        state.update('lists', lists => (
          lists.update(
            lists.findIndex(c => c.get('id') == listId),
            listItem => (
              listItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LIST_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('lists', lists => (
          lists.update(
            lists.findIndex(c => c.get('id') == listId),
            listItem => (
              listItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LIST_FAILURE: {
      return $$state.withMutations(state => (
        state.update('lists', lists => (
          lists.update(
            lists.findIndex(c => c.get('id') == listId),
            listItem => (
              listItem.merge({
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
