import request from 'axios';
import ReactOnRails from 'react-on-rails';
import Qs from 'qs'

const BASE_API_URL = '';

export default {

  fetchEntities(path, params = {}) {
    return request({
      method: 'GET',
      url: BASE_API_URL + path,
      responseType: 'json',
      params: params,
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
    });
  },

  submitEntity(path, entity = {}) {
    return request({
      method: 'POST',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },

  patchEntity(path, entity = {}) {
    return request({
      method: 'PATCH',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },

  putEntity(path, entity = {}) {
    return request({
      method: 'PUT',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },

  deleteEntity(path, entity = {}) {
    return request({
      method: 'DELETE',
      url: BASE_API_URL + path,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },
};
