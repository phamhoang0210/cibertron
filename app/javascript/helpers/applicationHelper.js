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

export function getFilterParams(filters) {
  let params = {}
  const page = filters.getIn(['paging', 'page'])
  const orders = filters.get('orders')
  const searches = filters.get('searches')
  const fields = filters.get('fields')

  // fetch page params
  if (page) {
    params.page = page
  }

  // fetch orders filters params
  if (orders.size > 0) {
    params.orders = orders.toArray()
  }

  // fetch fields params
  if (fields) {
    params.fields = fields
  }

  return Object.assign({}, params, searches.toJS())
}
