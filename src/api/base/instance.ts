import axios  from 'axios';
import { generateQueryString, QueryParams, getAuthToken } from 'helpers';
import { ApiContentType } from './types';

const { REACT_APP_API_URL } = process.env;

interface Options {
  params?: QueryParams;
  headers?: { [key: string]: string };
}

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  paramsSerializer: generateQueryString
});

axiosInstance.interceptors.request.use(
  (request) => {
    const authToken = getAuthToken();
    if (authToken) {
      request.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return request;
  },
);

function resolveErrorData(error) {
  const { response: { data } } = error;
  return data;
}

export function get(endpoint: string, options: Options = {}) {
  const { headers, params } = options;

  return axiosInstance.get(endpoint, {
    params,
    headers: {
      'Content-Type': ApiContentType.JSON,
      ...headers,
    },
  }).catch(error => {
    const errorData = resolveErrorData(error);
    return Promise.reject(errorData);
  });
}

export function post(endpoint: string, data: any, options: Options = {}) {
  const { headers, params } = options;

  return axiosInstance.post(endpoint, data, {
    params,
    headers: {
      'Content-Type': ApiContentType.JSON,
      ...headers,
    },
  }).catch(error => {
    const errorData = resolveErrorData(error);
    return Promise.reject(errorData);
  });
}

export function put(endpoint: string, data: any, options: Options = {}) {
  const { headers, params } = options;

  return axiosInstance.put(endpoint, data, {
    params,
    headers: {
      'Content-Type': ApiContentType.JSON,
      ...headers,
    },
  }).catch(error => {
    const errorData = resolveErrorData(error);
    return Promise.reject(errorData);
  });
}

export function patch(endpoint: string, data: any, options: Options = {}) {
  const { headers, params } = options;

  return axiosInstance.patch(endpoint, data, {
    params,
    headers: {
      'Content-Type': ApiContentType.JSON,
      ...headers,
    },
  }).catch(error => {
    const errorData = resolveErrorData(error);
    return Promise.reject(errorData);
  });
}

export function del(endpoint: string, options: Options = {}) {
  const { headers, params } = options;

  return axiosInstance.delete(endpoint, {
    params,
    headers: {
      'Content-Type': ApiContentType.JSON,
      ...headers,
    },
  }).catch(error => {
    const errorData = resolveErrorData(error);
    return Promise.reject(errorData);
  });
}
