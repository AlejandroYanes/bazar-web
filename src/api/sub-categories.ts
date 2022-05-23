import { Query } from 'appwrite';
import { SubCategoryModel } from 'models/sub-category';
import { ListResponse } from 'models/app-write';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_SUB_CATEGORIES } = process.env;

const subCategoriesApi = {
  list: (): Promise<ListResponse<SubCategoryModel>> => {
    return getAppWrite().database.listDocuments(REACT_APP_COLLECTION_SUB_CATEGORIES);
  },
  listByCategory: (category: string): Promise<ListResponse<SubCategoryModel>> => {
    return getAppWrite()
      .database
      .listDocuments(
        REACT_APP_COLLECTION_SUB_CATEGORIES,
        [Query.equal('category', category)],
      );
  },
  get: (subCategory: string): Promise<SubCategoryModel> => {
    return getAppWrite()
      .database
      .getDocument(REACT_APP_COLLECTION_SUB_CATEGORIES, subCategory);
  },
};

export default subCategoriesApi;
