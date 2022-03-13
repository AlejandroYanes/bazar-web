import { getAppWrite } from './base';
import { ListResponse } from '../models/app-write';
import { CategoryModel } from '../models/category';

const { REACT_APP_CATEGORIES_COLLECTION } = process.env;

const categoriesApi = {
  list: (): Promise<ListResponse<CategoryModel>> => {
    return getAppWrite().database.listDocuments(REACT_APP_CATEGORIES_COLLECTION);
  },
};

export default categoriesApi;
