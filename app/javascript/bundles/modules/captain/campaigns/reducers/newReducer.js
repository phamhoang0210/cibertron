import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
import { notification } from 'antd'

export const initialState = Immutable.fromJS({
  alert: null,
  campaign: [],
  isCreatingCampaign: false,
})

export default function newReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error } = action
  
  switch (type) {
    case actionTypes.SET_IS_CAP_CREATING_CAMPAIGN: {
      return $$state.merge({
        isCreatingCampaign: true,
      })
    }

    case actionTypes.CAP_CREATE_CAMPAIGN_SUCCESS: {
      if (action.record.status == 409) {
        notification['error']({
          message: action.record.message
        })
        return $$state.merge({
          isCreatingCampaign: false
        })
      } else {
        notification['success']({
          message: 'Thêm mới campaign thành công!'
        })
        return $$state.merge({
          isCreatingCampaign: false,
          campaign: record
        })
      }
    }

    case actionTypes.CAP_CREATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isCreatingCampaign: false,
        alert: parseError(error)
      })
    }

    default: {
      return $$state.merge({
        alert: null
      })
    }
  }
}
