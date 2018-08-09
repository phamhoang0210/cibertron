import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

/*export const initialState = Immutable.fromJS({
  alert: null,
  promos: [],
  promoFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingPromos: false,
})*/
export const initialState = {
  "records":[
    {
      key: '1',
      name: 'Flash sale thứ 7',
      type: 'Action',
      user: 'topica',
      deal: 10,
      date_create: '20/10/2018',
      date_over:  '20/11/2018'

    },
    {
      key: '2',
      name: 'Flash sale thứ 6',
      type: 'Dection',
      user: 'huyenpn',
      deal: 8,
      date_create: '23/6/2018',
      date_over:  '24/6/2018'

    },
    {
      key: '3',
      name: 'Flash sale thứ 5',
      type: 'Action',
      user: 'Khangpt',
      deal: 6,
      date_create: '30/11/2018',
      date_over:  '30/12/2018'

    }
  ]
}

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, promoId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_PROMOS: {
      return $$state.merge({
        isFetchingPromos: true,
      })
    }

    case actionTypes.FETCH_PROMOS_SUCCESS: {
      return $$state.merge({
        isFetchingPromos: false,
        promos: records,
        promoFilters: filters,
      })
    }

    case actionTypes.FETCH_PROMOS_FAILURE: {
      return $$state.merge({
        isFetchingPromos: false,
      })
    }

    case actionTypes.SET_IS_DELETING_PROMO: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
                isDeleting: true,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROMO_SUCCESS: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
                isDeleting: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.DELETE_PROMO_FAILURE: {
      $$state.withMutations(state => (
        state.update('promos', promos => (
          promos.update(
            promos.findIndex(c => c.get('id') == promoId),
            promoItem => (
              promoItem.merge({
                isDeleting: false,
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
