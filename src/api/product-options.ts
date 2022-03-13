import { getAppWrite } from './base';

const { REACT_APP_PRODUCT_OPTIONS_COLLECTION } = process.env;

const productOptionsApi = {
  list: () => {
    return getAppWrite().database.listDocuments(REACT_APP_PRODUCT_OPTIONS_COLLECTION);
  },
};

export default productOptionsApi;
