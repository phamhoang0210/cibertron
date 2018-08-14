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
      name: 'Flash sale thứ 7',
      id: 78
    },
    {
      name: 'Flash sale thứ 6',
      id: 80

    }
  ],
  "users":[
    {
      first_name: "linhnh16",
      id: 78
    },
    {
      first_name: "huyepn",
      id: 90
    }
  ],
  "type":[
    {
      title: "Action",
      id: 12,
      value: true
    },
    {
      title: "Deactive",
      id: 14,
      value: false
    }
  ],
  "status":[
    {
      title: "On",
      id: 65,
      value: true
    },
    {
      title: "Off",
      id: 30,
      value: false
    }
  ],
  
}
export default function sharedReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    default: {
      return $$state
    }
  }
}
