import { ListResponse } from 'models/app-write';
import { CategoryModel } from 'models/category';
import { getAppWrite } from './base';

const { REACT_APP_CATEGORIES_COLLECTION } = process.env;

const categoriesApi = {
  list: (): Promise<ListResponse<CategoryModel>> => {
    return getAppWrite().database.listDocuments(REACT_APP_CATEGORIES_COLLECTION);
  },
  get: (category: string): Promise<CategoryModel> => {
    return getAppWrite().database.getDocument(REACT_APP_CATEGORIES_COLLECTION, category);
  },
};

export default categoriesApi;
