import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  lead: null,
  isCreatingLead: false,
  sources: [
    { value: 'landingpage', title: 'landingpage' },
    { value: 'counselor', title: 'counselor' },
    { value: 'pedia', title: 'pedia' },
    { value: 'lead_fanpage', title: 'lead_fanpage' },
    { value: 'feature_course', title: 'feature_course' },
    { value: 'hotline', title: 'hotline' },
    { value: 'lecture_video_ad', title: 'lecture_video_ad' },
    { value: 'lecture_video_logo', title: 'lecture_video_logo' },
    { value: 'cod_referal', title: 'cod_referal' },
    { value: 'tele-marketting-bussiness', title: 'tele-marketting-bussiness' },
  ],
  types: [
    { value: 'c3', title: 'c3' },
    { value: 'c3_cod', title: 'c3_cod' },
    { value: 'c3_crosssell', title: 'c3_crosssell' },
  ],
  strategies: [
    { value: 'industry', title: 'industry' },
    { value: 'pilot', title: 'pilot' },
    { value: 'trial', title: 'trial' },
    { value: 'crosssell', title: 'crosssell' },
  ],
  priorities: [
    { value: '0', title: '0' },
    { value: '1', title: '1' },
    { value: '2', title: '2' },
    { value: '3', title: '3' },
  ]
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_LEAD: {
      return $$state.merge({
        isCreatingLead: true,
      })
    }

    case actionTypes.CREATE_LEAD_SUCCESS: {
      return $$state.merge({
        isCreatingLead: false,
        lead: record,
        alert: createSuccessAlert(`Lead was successfully created`),
      })
    }

    case actionTypes.CREATE_LEAD_FAILURE: {
      return $$state.merge({
        isCreatingLead: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
