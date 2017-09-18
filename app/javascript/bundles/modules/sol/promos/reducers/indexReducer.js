import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
import { defaultFilters } from 'app/constants/initialState'

export const initialState = Immutable.fromJS({
  alert: null,
  promoss: [],
  promoFilters: {
    ...defaultFilters,
    fields: ''
  },
  isFetchingPromos: false,
})

export default function indexReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, promoId } = action
  
  switch (type) {

    default: {
      return $$state
    }
  }
}
