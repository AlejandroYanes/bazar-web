import { AxiosResponse } from 'axios';
import { CategoryModel } from 'models/category';
import { get, PagedResponse } from './base';

const endpoint = 'categories';

const categoriesApi = {
  list: (): Promise<AxiosResponse<PagedResponse<CategoryModel>>> => {
    return get(endpoint);
  },
  getTree: (): Promise<AxiosResponse<PagedResponse<CategoryModel>>> => {
    return get(`${endpoint}/tree`);
  },
};

export default categoriesApi;
