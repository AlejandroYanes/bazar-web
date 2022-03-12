import { AxiosResponse } from 'axios';
import { QueryParams } from 'helpers/query-params';

export enum ApiContentType {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
}

export enum ApiErrorType {
  ERROR = 'error',
  VALIDATION = 'validation',
}

export interface ApiErrorResponse {
  errorType: ApiErrorType;
  errorMessage?: string;
  validationErrors?: { [field: string]: string[] };
}

export interface PagedResponse<T> {
  results: T[];
  page: number;
  count: number;
}

export interface ApiModel<T = any> {
  get?: (param: string | number) => Promise<AxiosResponse<T>>;
  list?: (params?: QueryParams) => Promise<AxiosResponse<PagedResponse<T>>>;
  create?: (payload) => Promise<AxiosResponse>;
  update?: (payload) => Promise<AxiosResponse>;
  delete?: (param: string | number) => Promise<AxiosResponse>;
}
