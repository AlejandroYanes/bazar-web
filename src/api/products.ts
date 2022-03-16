import { Query } from 'appwrite';
import { ProductModel } from 'models/product';
import { ListResponse } from 'models/app-write';
import { getAppWrite } from './base';

const { REACT_APP_PRODUCTS_COLLECTION } = process.env;

const productsApi = {
  listByCategory: (subCategory: string): Promise<ListResponse<ProductModel>> => {
    return getAppWrite()
      .database
      .listDocuments(
        REACT_APP_PRODUCTS_COLLECTION,
        [Query.equal('subCategory', subCategory)],
      );
  },
  get: (product: string): Promise<ProductModel> => {
    return getAppWrite().database.getDocument(REACT_APP_PRODUCTS_COLLECTION, product);
  }
};

export default productsApi;
