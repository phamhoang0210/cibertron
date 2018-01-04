import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  alert: null,
  list: null,
  listFilters: {
    ...defaultFilters,
    fields: 'upload_file{}'
  },
  isFetchingList: false,
  isUpdatingList: false,
})

export default function editReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, listId,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LIST: {
      return $$state.merge({
        isFetchingList: true,
        notification: null,
        alert: null,
        list: null,
      })
    }

    case actionTypes.FETCH_LIST_SUCCESS: {
      return $$state.merge({
        isFetchingList: false,
        list: record,
      })
    }

    case actionTypes.FETCH_LIST_FAILURE: {
      return $$state.merge({
        isFetchingList: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LIST: {
      return $$state.merge({
        isUpdatingList: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_LIST_SUCCESS: {
      return $$state.merge({
        isUpdatingList: false,
        notification: createSuccessAlert('Cập nhật thành công!'),
      }).update('list', listItem => (
        listItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_LIST_FAILURE: {
      return $$state.merge({
        isUpdatingList: false,
        notification: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
