import { Query } from 'appwrite';
import { SubCategoryModel } from 'models/sub-category';
import { ListResponse } from 'models/app-write';
import { getAppWrite } from './base';

const { REACT_APP_SUB_CATEGORIES_COLLECTION } = process.env;

const subCategoriesApi = {
  list: (): Promise<ListResponse<SubCategoryModel>> => {
    return getAppWrite().database.listDocuments(REACT_APP_SUB_CATEGORIES_COLLECTION);
  },
  listByCategory: (category: string): Promise<ListResponse<SubCategoryModel>> => {
    return getAppWrite()
      .database
      .listDocuments(
        REACT_APP_SUB_CATEGORIES_COLLECTION,
        [Query.equal('category', category)],
      );
  },
  get: (subCategory: string): Promise<SubCategoryModel> => {
    return getAppWrite()
      .database
      .getDocument(REACT_APP_SUB_CATEGORIES_COLLECTION, subCategory);
  },
};

export default subCategoriesApi;
