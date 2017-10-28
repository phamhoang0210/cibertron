import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { defaultFilters } from 'app/constants/initialState'
import { parseError, createSuccessAlert } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  notification: null,
  lead: null,
  leadCareHistory: {},
  defaultLeadParams: {
    fields: 'lead_level{},lead_status{}',
  },
  orders: [],
  orderFilters: {
    ...defaultFilters,
    fields: 'payment{payment_method{},payment_detail{}},order_level{}'
  },
  leadCareHistories: [],
  leadCareHistoryFilters: {
    ...defaultFilters,
    fields: 'lead_care_status{lead_status{}}'
  },
  erosOrders: [],
  isFetchingOrders: false,
  isFetchingLead: false,
  isUpdatingLead: false,
  isUpdatingLeadAttr: false,
  isCreatingOrder: false,
  isCalling: false,
  isFetchingLeadCareHistories: false,
  isUpdatingLeadCareHistory: false,
  isFetchingErosOrders: false,
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

    default: {
      return $$state
    }
  }
}
