import { Query } from 'appwrite';
import { ProductModel } from 'models/product';
import { ImageGravity, ListResponse } from 'models/app-write';
import { getAppWrite } from './base';

const { REACT_APP_PRODUCTS_COLLECTION, REACT_APP_BUCKET_ID } = process.env;

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
  },
  fetchThumbnail: (img: string): URL => {
    return getAppWrite()
      .storage
      .getFilePreview(REACT_APP_BUCKET_ID, img, 80, 80, ImageGravity.TOP_LEFT, 50);
  },
};

export default productsApi;
