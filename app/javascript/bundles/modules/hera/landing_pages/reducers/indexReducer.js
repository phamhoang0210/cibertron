import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  landingPages: [],
  landingPageFilters: {
    ...defaultFilters,
    fields: "domain{pagespeed_insight{}}"
  },
  isFetchingLandingPages: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, landingPageId,
    landingPage,
  } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LANDING_PAGES: {
      return $$state.merge({
        isFetchingLandingPages: true,
      })
    }

    case actionTypes.FETCH_LANDING_PAGES_SUCCESS: {
      return $$state.merge({
        isFetchingLandingPages: false,
        landingPages: records,
        landingPageFilters: filters,
      })
    }

    case actionTypes.FETCH_LANDING_PAGES_FAILURE: {
      return $$state.merge({
        isFetchingLandingPages: false,
      })
    }

    case actionTypes.SET_IS_DELETING_LANDING_PAGE: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(c => c.get('id') == landingPageId),
            landingPageItem => (
              landingPageItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LANDING_PAGE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(c => c.get('id') == landingPageId),
            landingPageItem => (
              landingPageItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LANDING_PAGE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(c => c.get('id') == landingPageId),
            landingPageItem => (
              landingPageItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: parseError(error),
        })
      ))
    }

    case actionTypes.SET_IS_FETCHING_LANDING_PAGE_LOGS: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(landingPageItem => landingPageItem.get('id') == landingPage.get('id')),
            landingPageItem => (
              landingPageItem.merge({
                isFetchingLandingPageLogs: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LANDING_PAGE_LOGS_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(landingPageItem => landingPageItem.get('id') == landingPage.get('id')),
            landingPageItem => (
              landingPageItem.merge({
                isFetchingLandingPageLogs: false,
                landingPageLogs: records,
                landingPageLogFilters: filters,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_LANDING_PAGE_LOGS_FAILURE: {
      return $$state.withMutations(state => (
        state.update('landingPages', landingPages => (
          landingPages.update(
            landingPages.findIndex(landingPageItem => landingPageItem.get('id') == landingPage.get('id')),
            landingPageItem => (
              landingPageItem.merge({
                isFetchingLandingPageLogs: false,
              })
            )
          )
        ))
      ))
    }

    default: {
      return $$state
    }
  }
}
