import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  campaign: null,
  isCreatingCampaign: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CREATING_CAMPAIGN: {
      return $$state.merge({
        isCreatingCampaign: true,
      })
    }

    case actionTypes.CREATE_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isCreatingCampaign: false,
        campaign: record,
        alert: createSuccessAlert(`Campaign was successfully created. {code: ${record.code}}`),
      })
    }

    case actionTypes.CREATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isCreatingCampaign: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state
    }
  }
}
