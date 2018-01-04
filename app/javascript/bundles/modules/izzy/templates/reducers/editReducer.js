import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  template: null,
  isFetchingTemplate: false,
  isUpdatingTemplate: false,
})

export default function editReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, templateId,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_TEMPLATE: {
      return $$state.merge({
        isFetchingTemplate: true,
        notification: null,
        template: null,
      })
    }

    case actionTypes.FETCH_TEMPLATE_SUCCESS: {
      return $$state.merge({
        isFetchingTemplate: false,
        template: record,
      })
    }

    case actionTypes.FETCH_TEMPLATE_FAILURE: {
      return $$state.merge({
        isFetchingTemplate: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_TEMPLATE: {
      return $$state.merge({
        isUpdatingTemplate: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_TEMPLATE_SUCCESS: {
      return $$state.merge({
        isUpdatingTemplate: false,
        notification: createSuccessAlert('Cập nhật thành công!'),
      }).update('template', templateItem => (
        templateItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_TEMPLATE_FAILURE: {
      return $$state.merge({
        isUpdatingTemplate: false,
        notification: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
