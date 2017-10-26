import { Map} from 'immutable'
import DeepMerge from 'deep-merge/multiple'
import { browserHistory } from 'react-router'
import qs from 'qs'
import moment from 'moment'

export function parseError(error) {
  const response = error.response
  let alertMessages = ['System error!']

  if (response) {
    switch(response.status){
      case 401:
        alertMessages = response.data.errors
        break
      case 404:
      case 403:
      case 422:
        alertMessages = response.data
        break
    }
  }

  return {
    messages: alertMessages,
    type: 'error'
  }
}

export function createSuccessAlert(message) {
  return {
    messages: [message],
    type: 'success'
  }
}

export function createLoadingAlert(message) {
  return {
    messages: [message],
    type: 'loading'
  }
}

export function getFilterParams(filters, location = null) {
  let filterParams = {}
  const page = filters.getIn(['paging', 'page'])
  const orders = filters.get('orders')
  const searches = filters.get('searches')
  const fields = filters.get('fields')
  const compconds = filters.get('compconds')

  // fetch page params
  if (page) {
    filterParams.page = page
  }

  // fetch orders filters params
  if (orders.size > 0) {
    filterParams.orders = orders.toArray()
  }

  // fetch fields params
  if (fields) {
    filterParams.fields = fields
  }

  // fetch compconds
  if (compconds) {
    filterParams.compconds = compconds.toJS()
  }

  const queryParams = getUrlQuery(location)

  const latestParams = mergeDeep([filterParams, searches.toJS(), queryParams])

  return latestParams
}

export function getFilterParamsAndSyncUrl(filters, location, params = {}) {
  let filterParams = {}
  const page = filters.getIn(['paging', 'page'])
  const orders = filters.get('orders')
  const searches = filters.get('searches')
  const fields = filters.get('fields')
  const compconds = filters.get('compconds')

  // fetch page filterParams
  if (page) {
    filterParams.page = page
  }

  // fetch orders filters filterParams
  if (orders.size > 0) {
    filterParams.orders = orders.toArray()
  }

  // fetch fields filterParams
  if (fields) {
    filterParams.fields = fields
  }

  // fetch compconds
  if (compconds) {
    filterParams.compconds = compconds.toJS()
  }

  const queryParams = getUrlQuery(location)
  const latestParams = mergeDeep([filterParams, searches.toJS(), queryParams, params])

  syncUrlQuery(location, latestParams)

  return latestParams
}

export function syncUrlQuery(location, params) {
  const searchString = qs.stringify(params, {arrayFormat: 'bracket', encode: true})
  browserHistory.push({pathname: location.pathname, search: `?${searchString}`})
}

export function getUrlQuery(location) {
  if(location && location.search) {
    return qs.parse(location.search.replace(/^\?/, ""))
  } else {
    return {}
  }
}

export function mergeDeep(objs = []) {
  const merge = DeepMerge(function (a, b) {
    return b
  })
  
  return merge(objs)
}

export function rowClassName(record, index) {
  if(record.isUpdating) {
    return 'table-row-status--updating'
  } else if (record.isDeleting) {
    return 'table-row-status--deleting'
  }
}

export function getDefaultTablePagination(currentPage, totalPage){
  return {
    showQuickJumper: true,
    total: totalPage,
    current: currentPage,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  }
}

export function getDefaultTableTitlePagination(currentPage, totalPage){
  return {
    showQuickJumper: false,
    total: totalPage,
    current: currentPage,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
  }
}


export function getInitialValueForRangePicker(options, filters, fieldFrom, fieldTo) {
  const startDateStr = filters.getIn(['compconds', ...fieldFrom])
  const endDateStr = filters.getIn(['compconds', ...fieldTo])
  const startDate = startDateStr && moment(startDateStr)
  const endDate = endDateStr && moment(endDateStr)

  if(startDate && endDate) {
    options.initialValue = [startDate, endDate]
  }

  return options
}

export function getInitialValue(options, filters, field) {
  const initialValue = filters.getIn(['compconds', ...field])
  if(initialValue) {
    options.initialValue = initialValue.toJS()
  }
  return options
}

export function getInitialValueForSearch(options, filters, field) {
  const initialValue = filters.getIn(['compconds', ...field])
  if(initialValue) {
    options.initialValue = initialValue.replace(/^\%/, '').replace(/\%$/, '')
  }
  return options
}

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value       = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}