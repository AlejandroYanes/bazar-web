import { ListResponse } from 'models/app-write';
import { CategoryModel } from 'models/category';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CATEGORIES } = process.env;

const categoriesApi = {
  list: (): Promise<ListResponse<CategoryModel>> => {
    return getAppWrite().database.listDocuments(REACT_APP_COLLECTION_CATEGORIES);
  },
  get: (category: string): Promise<CategoryModel> => {
    return getAppWrite().database.getDocument(REACT_APP_COLLECTION_CATEGORIES, category);
  },
};

export default categoriesApi;
