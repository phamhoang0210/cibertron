import request from 'axios'
import ReactOnRails from 'react-on-rails'
import {getCredentials} from 'helpers/auth/authHelper'
const BASE_API_URL = ''

export default {

  fetchEntities(path, params = {}) {
    const credentials = getCredentials()

    return request({
      method: 'GET',
      url: BASE_API_URL + path,
      responseType: 'json',
      params: params,
      headers: credentials,
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
    });
  },
};
