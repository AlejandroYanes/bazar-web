import { getAppWrite } from './base';

const { REACT_APP_SUB_CATEGORIES_COLLECTION } = process.env;

const subCategoriesApi = {
  list: () => {
    return getAppWrite().database.listDocuments(REACT_APP_SUB_CATEGORIES_COLLECTION);
  },
};

export default subCategoriesApi;
