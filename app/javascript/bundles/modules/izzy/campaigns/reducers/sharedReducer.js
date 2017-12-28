import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  senders: [],
  lists: [],
  templates: [],
  isFetchingSenders: false,
  isFetchingLists: false,
  isFetchingTemplates: false,
})

export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action

  switch (type) {

    case actionTypes.SET_IS_FETCHING_SENDERS: {
      return $$state.merge({
        isFetchingSenders: true,
      })
    }

    case actionTypes.FETCH_SENDERS_SUCCESS: {
      return $$state.merge({
        isFetchingCampaigns: false,
        senders: records,
      })
    }

    case actionTypes.FETCH_SENDERS_FAILURE: {
      return $$state.merge({
        isFetchingSenders: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_LISTS: {
      return $$state.merge({
        isFetchingLists: true,
      })
    }

    case actionTypes.FETCH_LISTS_SUCCESS: {
      return $$state.merge({
        isFetchingLists: false,
        lists: records,
      })
    }

    case actionTypes.FETCH_LISTS_FAILURE: {
      return $$state.merge({
        isFetchingLists: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_TEMPLATES: {
      return $$state.merge({
        isFetchingTemplates: true,
      })
    }

    case actionTypes.FETCH_TEMPLATES_SUCCESS: {
      return $$state.merge({
        isFetchingTemplates: false,
        templates: records,
      })
    }

    case actionTypes.FETCH_TEMPLATES_FAILURE: {
      return $$state.merge({
        isFetchingTemplates: false,
      })
    }

    default: {
      return $$state
    }
  }
}
