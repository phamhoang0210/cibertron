import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  landingPage: null,
  editorLink: null,
  isFetchingLandingPage: false,
  isFetchingEditorLink: false,
  isUpdatingLandingPage: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, landingPageId, index} = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LANDING_PAGE: {
      return $$state.merge({
        isFetchingLandingPage: true,
        alert: null,
        landingPage: null,
      })
    }

    case actionTypes.FETCH_LANDING_PAGE_SUCCESS: {
      return $$state.merge({
        isFetchingLandingPage: false,
        landingPage: record,
      })
    }

    case actionTypes.FETCH_LANDING_PAGE_FAILURE: {
      return $$state.merge({
        isFetchingLandingPage: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_EDITOR_LINK: {
      return $$state.merge({
        isFetchingEditorLink: true,
        alert: null,
        editorLink: null,
      })
    }

    case actionTypes.FETCH_EDITOR_LINK_SUCCESS: {
      return $$state.merge({
        isFetchingEditorLink: false,
        editorLink: record,
      })
    }

    case actionTypes.FETCH_EDITOR_LINK_FAILURE: {
      return $$state.merge({
        isFetchingEditorLink: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LANDING_PAGE: {
      return $$state.merge({
        isUpdatingLandingPage: true,
      })
    }

    case actionTypes.UPDATE_LANDING_PAGE_SUCCESS: {
      return $$state.merge({
        isUpdatingLandingPage: false,
        alert: createSuccessAlert('LandingPage was successfully updated'),
      }).update('landingPage', landingPageItem => (
        landingPageItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_LANDING_PAGE_FAILURE: {
      return $$state.merge({
        isUpdatingLandingPage: false,
        alert: parseError(error)
      })
    }

    case actionTypes.DELETE_COURSE: {
      debugger
      return $$state.setIn(
        ['editorLink'],
        $$state.getIn(['editorLink']).filter((key, i) => i !== index)
      )
    }
    default: {
      return $$state
    }
  }
}
