import { ApiModel } from './types';
import { del, get, post, put } from './instance';

export function getApi<T = any>(
  endpoint: string,
): ApiModel<T> {
  return {
    get(id) {
      return get(`${endpoint}/${id}`);
    },
    list(params?) {
      return get(endpoint, { params });
    },
    create(entity) {
      return post(endpoint, entity);
    },
    update(entity) {
      return put(`${endpoint}${entity.id}`, entity);
    },
    delete(param) {
      return del(`${endpoint}${param}`);
    }
  };
}
