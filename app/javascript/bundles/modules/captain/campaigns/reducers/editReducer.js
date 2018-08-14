import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = {
  alert: null,
  campaign: null,
  isFetchingCampaign: false,
  isUpdatingCampaign: false,
  "left_records":[
    {
      key: '1',
      course_name: 'Khóa A',
      course_code: 'course_01',
      price: '199000'
    },
    {
      key: '2',
      course_name: 'Khóa B',
      course_code: 'course_02',
      price: '299000'
    },
    {
      key: '3',
      course_name: 'Khóa C',
      course_code: 'course_03',
      price: '399000'
    }
  ],
  "right_records":[
    {
      key: '1',
      course_code: 'course_01',
      price: '199000'
    },
    {
      key: '2',
      course_code: 'course_02',
      price: '299000'
    },
    {
      key: '3',
      course_code: 'course_03',
      price: '399000'
    }
  ],
}

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, campaignId } = action
  
  switch (type) {
    case actionTypes.SET_IS_FETCHING_CAMPAIGN: {
      return $$state.merge({
        isFetchingCampaign: true,
        alert: null,
        campaign: null,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isFetchingCampaign: false,
        campaign: records,
      })
    }

    case actionTypes.FETCH_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isFetchingCampaign: false,
        alert: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_CAMPAIGN: {
      return $$state.merge({
        isUpdatingCampaign: true,
      })
    }

    case actionTypes.UPDATE_CAMPAIGN_SUCCESS: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: createSuccessAlert('Campaign was successfully updated'),
      }).update('campaign', campaignItem => (
        campaignItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_CAMPAIGN_FAILURE: {
      return $$state.merge({
        isUpdatingCampaign: false,
        alert: parseError(error)
      })
    }
    default: {
      return $$state
    }
  }
}
