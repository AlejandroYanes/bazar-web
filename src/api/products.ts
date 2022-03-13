import { getAppWrite } from './base';

const { REACT_APP_PRODUCTS_COLLECTION } = process.env;

const productsApi = {
  list: () => {
    return getAppWrite().database.listDocuments(REACT_APP_PRODUCTS_COLLECTION);
  },
};

export default productsApi;
