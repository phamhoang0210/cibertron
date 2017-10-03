import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  landingpages: [],
  landingpageFilters: {
    ...defaultFilters,
    fields: '_id,domain,coursesname,strategy,old_price,new_price,type_tracking,type,pedia_domain,full_domain'
  },
  isFetchingLandingpages: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, landingpageId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_LANDINGPAGES: {
      return $$state.merge({
        isFetchingLandingpages: true,
      })
    }

    case actionTypes.FETCH_LANDINGPAGES_SUCCESS: {
      return $$state.merge({
        isFetchingLandingpages: false,
        landingpages: records,
        landingpageFilters: filters,
      })
    }

    case actionTypes.FETCH_LANDINGPAGES_FAILURE: {
      return $$state.merge({
        isFetchingLandingpages: false,
      })
    }

    case actionTypes.SET_IS_DELETING_LANDINGPAGE: {
      return $$state.withMutations(state => (
        state.update('landingpages', landingpages => (
          landingpages.update(
            landingpages.findIndex(c => c.get('id') == landingpageId),
            landingpageItem => (
              landingpageItem.merge({
                isDeleting: true,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LANDINGPAGE_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('landingpages', landingpages => (
          landingpages.update(
            landingpages.findIndex(c => c.get('id') == landingpageId),
            landingpageItem => (
              landingpageItem.merge({
                isDeleting: false,
              })
            )
          )
        )).merge({
          alert: null,
        })
      ))
    }

    case actionTypes.DELETE_LANDINGPAGE_FAILURE: {
      return $$state.withMutations(state => (
        state.update('landingpages', landingpages => (
          landingpages.update(
            landingpages.findIndex(c => c.get('id') == landingpageId),
            landingpageItem => (
              landingpageItem.merge({
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
