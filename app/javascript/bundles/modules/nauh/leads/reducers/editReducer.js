import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  lead: null,
  emailTemplate: null,
  callLog: null,
  defaultLeadParams: {
    fields: 'lead_level{},care_status{}',
  },
  orders: [],
  orderFilters: {
    ...defaultFilters,
    fields: 'payment{payment_method{},payment_detail{}},order_level{}'
  },
  callLogs: [],
  callLogFilters: {
    ...defaultFilters,
    fields: 'call_status{care_status{}}'
  },
  isFetchingOrders: false,
  isFetchingLead: false,
  isUpdatingLead: false,
  isUpdatingLeadAttr: false,
  isCreatingOrder: false,
  isCalling: false,
  isFetchingCallLogs: false,
  isUpdatingCallLog: false,
})

export default function editReducer($$state = initialState, action = null) {
  const { type, record, records, filters, error, leadId } = action
  
  switch (type) {
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
        callLog: null,
      })
    }

    case actionTypes.CALL_SUCCESS: {
      return $$state.merge({
        isCalling: false,
        callLog: record,
        notification: createSuccessAlert('Kết nối cuộc gọi thành công!'),
      })
    }

    case actionTypes.CALL_FAILURE: {
      return $$state.merge({
        isCalling: false,
        notification: parseError(error)
      })
    }

    case actionTypes.SET_IS_FETCHING_CALL_LOGS: {
      return $$state.merge({
        isFetchingCallLogs: true,
        notification: null,
      })
    }

    case actionTypes.FETCH_CALL_LOGS_SUCCESS: {
      return $$state.merge({
       isFetchingCallLogs: false, 
       callLogs: records,
       callLogFilters: filters,
      })
    }

    case actionTypes.FETCH_CALL_LOGS_FAILURE: {
      return $$state.merge({
        isFetchingCallLogs: false,
        notification: parseError(error),
      })
    }

    case actionTypes.SET_IS_UPDATING_CALL_LOG: {
      return $$state.merge({
        isUpdatingCallLog: true,
        notification: null,
      })
    }

    case actionTypes.UPDATE_CALL_LOG_SUCCESS: {
      return $$state.merge({
        isUpdatingCallLog: false,
        callLog: record,
        notification: createSuccessAlert('Cập nhật thành công'),
      })
    }

    case actionTypes.UPDATE_CALL_LOG_FAILURE: {
      return $$state.merge({
        isUpdatingCallLog: false,
      })
    }

    default: {
      return $$state
    }
  }
}
