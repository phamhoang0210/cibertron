import request from 'axios'
import ReactOnRails from 'react-on-rails'
import { getCredentials, handleAuthFailure } from 'helpers/auth/authHelper'
import Qs from 'qs'

const BASE_API_URL = ''

function validateStatus(status) {
  if (status == 401) { handleAuthFailure() }
  return status >= 200 && status < 300
}

export default {
  fetchEntities(path, params = {}) {
    const credentials = getCredentials()

    return request({
      method: 'GET',
      url: BASE_API_URL + path,
      responseType: 'json',
      params: params,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      headers: credentials,
      validateStatus: validateStatus,
    });
  },

  fetchEntity(path, params = {}) {
    const credentials = getCredentials();

    return request({
      method: 'GET',
      url: path,
      responseType: 'json',
      params: params,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      headers: credentials,
      validateStatus: validateStatus,
    });
  },

  submitEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()

    return request({
      method: 'POST',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {...credentials, ...railsAuthenticityHeaders},
      data: entity,
      validateStatus: validateStatus,
    });
  },

  patchEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()

    return request({
      method: 'PATCH',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {...credentials, ...railsAuthenticityHeaders},
      data: entity,
      validateStatus: validateStatus,
    });
  },

  putEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()

    return request({
      method: 'PUT',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {...credentials, ...railsAuthenticityHeaders},
      data: entity,
      validateStatus: validateStatus,
    });
  },

  deleteEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()
    
    return request({
      method: 'DELETE',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {...credentials, ...railsAuthenticityHeaders},
      data: entity,
      validateStatus: validateStatus,
    });
  },

  uploadEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()
    
    return request({
      method: 'POST',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {
        ...credentials,
        ...railsAuthenticityHeaders,
        'Content-Type': 'multipart/form-data',
      },
      data: entity,
      validateStatus: validateStatus,
    });
  },

  uploadPutEntity(path, entity = {}) {
    const credentials = getCredentials()
    const railsAuthenticityHeaders = ReactOnRails.authenticityHeaders()
    
    return request({
      method: 'PUT',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: {
        ...credentials,
        ...railsAuthenticityHeaders,
        'Content-Type': 'multipart/form-data',
      },
      data: entity,
      validateStatus: validateStatus,
    });
  }

};
