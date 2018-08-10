import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
/*export const initialState = Immutable.fromJS({
  combos: [],
  isFetchingCombos: false,
})*/
export const initialState = {
  "campaigns":[
    {
      'name': 'Flash sale thứ 7',
      'id': 78
    },
    {
      'name': 'Flash sale thứ 6',
      'id': 80
    }
  ]
}
export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    default: {
      return $$state
    }
  }
}
