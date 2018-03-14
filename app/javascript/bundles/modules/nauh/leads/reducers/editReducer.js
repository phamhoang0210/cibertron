import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  lead: null,
  emailTemplate: null,
  leadCareHistory: {},
  defaultLeadParams: {
    fields: 'lead_level{},lead_status{},sex{},utm{}',
  },
  orders: [],
  orderFilters: {
    ...defaultFilters,
    fields: 'payment{payment_method{},payment_detail{}},order_level{}'
  },
  leadCareHistories: [],
  leadCareHistoryFilters: {
    ...defaultFilters,
    fields: 'lead_care_status{lead_status{}},call_log{}'
  },
  erosOrders: [],
  l8Report: {},
  isFetchingOrders: false,
  isFetchingLead: false,
  isUpdatingLead: false,
  isUpdatingLeadAttr: false,
  isCreatingOrder: false,
  isCalling: false,
  isFetchingLeadCareHistories: false,
  isUpdatingLeadCareHistory: false,
  isFetchingErosOrders: false,
  isFetchingL8Report: false,
  isRec: false,
  recCourses: [],
  isCreateRecommend: false,
  isGetRecommendNauh: false,
  recommendNauh: []
})

export default function editReducer($$state = initialState, action = null) {
  const {
    type, record, records, filters, error, leadId, leadCareHistoryId,
    audio_link, data
  } = action

  switch (type) {

    // Get Recommand from Nauth
    case actionTypes.SET_IS_FETCHING_RECOMMENDATION_NAUH: {
      return $$state.merge({ isGetRecommendNauh: true })
    }

    case actionTypes.FETCH_RECOMMENDATION_SUCESS_NAUH: {
      return $$state.merge({
        isGetRecommendNauh: false,
        recommendNauh: action.data,
      })
    }

    case actionTypes.FETCH_RECOMMENDATION_FAILURE_NAUH: {
      return $$state.merge({
        isGetRecommendNauh: false,
        notification: parseError(error)
      })
    }

    // Get Recommand from eros
    case actionTypes.SET_IS_FETCHING_RECOMMENDATION: {
      return $$state.merge({ isRec: true })
    }

    case actionTypes.FETCH_RECOMMENDATION_SUCESS: {
      return $$state.merge({
        isRec: false,
        recCourses: action.data,
      })
    }

    case actionTypes.FETCH_RECOMMENDATION_FAILURE: {
      return $$state.merge({
        isRec: false,
        notification: parseError(error)
      })
    }

    // Create Recommand
    case actionTypes.SET_IS_CREATE_RECOMMENDATION: {
      return $$state.merge({ isCreateRecommend: true })
    }

    case actionTypes.CREATE_RECOMMENDATION_SUCESS: {
      return $$state.merge({
        isCreateRecommend: false,
        notification: createSuccessAlert('Gửi thành công!'),
      })
    }

    case actionTypes.CREATE_RECOMMENDATION_FAILURE: {
      return $$state.merge({
        isCreateRecommend: false,
        notification: parseError(error)
      })
    }

    ////
    case actionTypes.SET_IS_FETCHING_LEAD: {
      return $$state.merge({
        isFetchingLead: true,
        notification: null,
        lead: null,
      })
    }

    case actionTypes.FETCH_LEAD_SUCCESS: {
      return $$state.merge({
        isFetchingLead: false,
        lead: record,
      })
    }

    case actionTypes.FETCH_LEAD_FAILURE: {
      return $$state.merge({
        isFetchingLead: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_EMAIL_LEAD: {
      return $$state.merge({
        isFetchingEmailLead: true,
        notification: null,
        emailTemplate: null,
      })
    }

    case actionTypes.FETCH_EMAIL_LEAD_SUCCESS: {
      return $$state.merge({
        isFetchingEmailLead: false,
        emailTemplate: record,
      })
    }

    case actionTypes.FETCH_EMAIL_LEAD_FAILURE: {
      return $$state.merge({
        isFetchingMailLead: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LEAD: {
      return $$state.merge({
        isUpdatingLead: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_LEAD_SUCCESS: {
      return $$state.merge({
        isUpdatingLead: false,
        notification: createSuccessAlert('Cập nhật thành công!'),
      }).update('lead', leadItem => (
        leadItem.merge(record)
      ))
    }

    case actionTypes.UPDATE_LEAD_FAILURE: {
      return $$state.merge({
        isUpdatingLead: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_UPDATING_LEAD_ATTR: {
      return $$state.merge({
        isUpdatingLeadAttr: true,
        notification: null,
      })
    }


    case actionTypes.UPDATE_LEAD_ATTR_SUCCESS: {
      return $$state.merge({
        isUpdatingLeadAttr: false,
      }).update('lead', leadItem => (
        leadItem.merge(record)
      ))
    }


    case actionTypes.UPDATE_LEAD_ATTR_FAILURE: {
      return $$state.merge({
        isUpdatingLeadAttr: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_ORDERS: {
      return $$state.merge({
        isFetchingOrders: true,
      })
    }

    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return $$state.merge({
        isFetchingOrders: false,
        orders: records,
        orderFilters: filters,
      })
    }

    case actionTypes.FETCH_ORDERS_FAILURE: {
      return $$state.merge({
        isFetchingOrders: false,
        notification: parseError(error),
      })
    }

    case actionTypes.SET_IS_CREATING_ORDER: {
      return $$state.merge({
        isCreatingOrder: true,
        notification: null,
      })
    }

    case actionTypes.CREATE_ORDER_SUCCESS: {
      return $$state.merge({
        isCreatingOrder: false,
        notification: createSuccessAlert('Tạo đơn thành công'),
      })
    }

    case actionTypes.CREATE_ORDER_FAILURE: {
      return $$state.merge({
        isCreatingOrder: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_CALLING: {
      return $$state.merge({
        isCalling: true,
        notification: null,
      })
    }

    case actionTypes.CALL_SUCCESS: {
      return $$state.merge({
        isCalling: false,
        notification: createSuccessAlert('Kết nối cuộc gọi thành công!'),
      }).update('leadCareHistory', leadCareHistory => (
        leadCareHistory.merge(record)
      ))
    }

    case actionTypes.CALL_FAILURE: {
      return $$state.merge({
        isCalling: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_LEAD_CARE_HISTORIES: {
      return $$state.merge({
        isFetchingLeadCareHistories: true,
        notification: null,
      })
    }

    case actionTypes.FETCH_LEAD_CARE_HISTORIES_SUCCESS: {
      return $$state.merge({
       isFetchingLeadCareHistories: false,
       leadCareHistories: records,
       leadCareHistoryFilters: filters,
      })
    }

    case actionTypes.FETCH_LEAD_CARE_HISTORIES_FAILURE: {
      return $$state.merge({
        isFetchingLeadCareHistories: false,
        notification: parseError(error),
      })
    }

    case actionTypes.SET_IS_UPDATING_LEAD_CARE_HISTORY: {
      return $$state.merge({
        isUpdatingLeadCareHistory: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_LEAD_CARE_HISTORY_SUCCESS: {
      return $$state.merge({
        isUpdatingLeadCareHistory: false,
        leadCareHistory: {},
        notification: createSuccessAlert('Cập nhật thành công'),
      })
    }

    case actionTypes.UPDATE_LEAD_CARE_HISTORY_FAILURE: {
      return $$state.merge({
        isUpdatingLeadCareHistory: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_EROS_ORDERS: {
      return $$state.merge({
        isFetchingErosOrders: true,
      })
    }

    case actionTypes.FETCH_EROS_ORDERS_SUCCESS: {
      return $$state.merge({
        isFetchingErosOrders: false,
        erosOrders: records,
      })
    }

    case actionTypes.FETCH_EROS_ORDERS_FAILURE: {
      return $$state.merge({
        isFetchingErosOrders: false,
      })
    }

    case actionTypes.SET_IS_FETCHING_CALL_LOG_AUDIO_LINK: {
      return $$state.withMutations(state => (
        state.update('leadCareHistories', leadCareHistories => (
          leadCareHistories.update(
            leadCareHistories.findIndex(leadCareHistoryItem => leadCareHistoryItem.get('id') == leadCareHistoryId),
            leadCareHistoryItem => (
              leadCareHistoryItem.merge({
                isFetchingCallLogAudioLink: true,
              })
            )
          )
        )).merge({
          notification: null,
        })
      ))
    }

    case actionTypes.FETCH_CALL_LOG_AUDIO_LINK_SUCCESS: {
      return $$state.withMutations(state => (
        state.update('leadCareHistories', leadCareHistories => (
          leadCareHistories.update(
            leadCareHistories.findIndex(leadCareHistoryItem => leadCareHistoryItem.get('id') == leadCareHistoryId),
            leadCareHistoryItem => (
              leadCareHistoryItem.mergeDeep({
                call_log: {audio_link},
                isFetchingCallLogAudioLink: false,
              })
            )
          )
        ))
      ))
    }

    case actionTypes.FETCH_CALL_LOG_AUDIO_LINK_FAILURE: {
      return $$state.withMutations(state => (
        state.update('leadCareHistories', leadCareHistories => (
          leadCareHistories.update(
            leadCareHistories.findIndex(leadCareHistoryItem => leadCareHistoryItem.get('id') == leadCareHistoryId),
            leadCareHistoryItem => (
              leadCareHistoryItem.merge({
                isFetchingCallLogAudioLink: false,
              })
            )
          )
        )).merge({
          notification: parseError(error),
        })
      ))
    }

    case actionTypes.SET_IS_FETCHING_L8_REPORT: {
      return $$state.merge({
        isFetchingL8Report: true,
      })
    }

    case actionTypes.FETCH_L8_REPORT_SUCESS: {
      return $$state.merge({
        isFetchingL8Report: false,
        l8Report: data,
      })
    }

    case actionTypes.FETCH_L8_REPORT_FAILURE: {
      return $$state.merge({
        isFetchingL8Report: false,
      })
    }

    default: {
      return $$state
    }
  }
}
